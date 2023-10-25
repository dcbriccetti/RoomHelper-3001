import React, {useContext, useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import socketIOClient, {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Seating from "./components/Seating";
import Control from "./components/Control";
import Contact from "./components/Contact";
import Calling from "./components/Calling";
import Chat from "./components/Chat";
import Poll from "./components/Poll/Poll";
import {Settings} from "./components/Poll/types";
import {MainPage} from "./components/MainPage";
import {StationModel} from "./StationModel";

let HOSTNAME = "http://127.0.0.1:5000";
const ENDPOINT = HOSTNAME + "/teacher";

const SocketContext = React.createContext<Socket | null>(null);
const SettingsContext = React.createContext<Settings | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function useSettings() {
    return useContext(SettingsContext);
}

export default function App() {
    const [settings, setSettings] = useState<Settings | null>(null)
    const [stationModels, setStationModels] = useState<StationModel[]>([])
    const stationModelsRef = useRef<StationModel[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (!socketRef.current) {
        const s = socketRef.current = socketIOClient(ENDPOINT);
        console.log("Socket initialized:", s);

        // Handle connection errors
        s.on('connect_error', (err) => {
            console.error('Connection failed:', err);
            setError('Failed to connect to the server.');
        });

        s.on('disconnect', () => {
            console.log('Disconnected from server');
            setError('Disconnected from the server.');
        });
        s.on('seated', handleSeated);
    }

    useEffect(() => {
        fetch(HOSTNAME + '/settings')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const s = data as Settings;
                setSettings(data);
                setStationModels(
                    Array.from({ length: s.rows * s.columns}).map((_, i) =>
                    ({
                        index: i,
                        row: Math.floor(i / s.columns),
                        column: i % s.columns,
                        ip: '',
                        firstName: '',
                        lastName: '',
                    })))
            })
            .catch((error) => {
                console.error(error)
            });
        return () => {
            // socketRef.current?.disconnect();   // todo find why this closes the socket
        };
    }, []);

    useEffect(() => {
        stationModelsRef.current = stationModels;
    }, [stationModels]);

    type SeatedMessage = {
        seatIndex: number
        name: string
        ip: string
    }

    function handleSeated({seatIndex, name, ip}: SeatedMessage) {
        console.log("Seated:", seatIndex, name, ip);

        const updatedStationModels = [...stationModelsRef.current];
        const u = {...updatedStationModels[seatIndex]}
        const [firstName, lastName] = name.split(', ');
        u.firstName = firstName;
        u.lastName = lastName;
        u.ip = ip;
        updatedStationModels[seatIndex] = u;
        setStationModels(updatedStationModels);
    }

    // @formatter:off
    const navLinksData = [
        {path: "/",        name: "Home",    component: <MainPage stationModels={stationModels}/>},
        {path: "/seating", name: "Seating", component: <Seating />},
        {path: "/control", name: "Control", component: <Control />},
        {path: "/contact", name: "Contact", component: <Contact />},
        {path: "/calling", name: "Calling", component: <Calling />},
        {path: "/chat",    name: "Chat",    component: <Chat prefix='chat'/>},
        {path: "/poll",    name: "Poll",    component: <Poll    />},
    ];
    // @formatter:on

    return (
        <SettingsContext.Provider value={settings}>
            <SocketContext.Provider value={socketRef.current}>
                <div className="App thin-margin">
                    {error && <div className="error-message">{error}</div>}
                    <nav>
                        <Router>
                            {navLinksData.map(link => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({isActive}) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            <Routes>
                                {navLinksData.map(link => (
                                    <Route key={link.path} path={link.path} element={link.component}/>
                                ))}
                            </Routes>
                        </Router>
                    </nav>
                </div>
            </SocketContext.Provider>
        </SettingsContext.Provider>
    );
}

