import React, {useContext, useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import socketIOClient, {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./StationModel";
import Seating from "./components/Seating";
import Room from './components/Room';
import Control from "./components/Control";
import Contact from "./components/Contact";
import Calling from "./components/Calling";
import Chat from "./components/Chat";
import Poll from "./components/Poll/Poll";
import {Settings} from "./components/Poll/types";

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
                setSettings(data);
                console.log("Settings:", data);
            })
            .catch((error) => {
                console.error(error)
            });
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // @formatter:off
    const navLinksData = [
        {path: "/",        name: "Home",    component: <MainPage/>},
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
                    {error && <div className="error-message">{error}</div>} {/* Optional: Display error messages */}
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

function MainPage() {
    const [studentNames, setStudentNames] = useState([''])
    const settings = useSettings();

    useEffect(() => {
        fetch(HOSTNAME + '/students')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setStudentNames(data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    if (!settings) {
        return <div>Loading...</div>;
    }
    console.log(`rows: ${settings.rows}, cols: ${settings.columns}`)

    const stationData: StationModel[] = studentNames.map((name, i) => {
        const [firstName, lastName] = name.split(' ');
        return ({
            index: i,
            ip: '10.0.0.' + (i + 1),
            firstName: firstName,
            lastName: lastName,
            x: i * 50,
            y: 24 // todo find better way to position these below the Teacher View checkbox
        });
    })

    return (
        <div>
            <div>
                <h3>RoomHelper 3001</h3>
                <Room stationModels={stationData}/>
                <p/>
                <p style={{fontSize: '70%'}}><a href="https://davebsoft.com">Dave Briccetti Software LLC</a></p>
                <br/>
            </div>
        </div>
    );
}
