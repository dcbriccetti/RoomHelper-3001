import React, {useContext, useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import socketIOClient, {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./StationModel";
import Seating from "./components/Seating";
import Room from './components/Room';
import Control from "./components/Control";

let HOSTNAME = "http://127.0.0.1:5000";
const ENDPOINT = HOSTNAME + "/teacher";

const SocketContext = React.createContext<Socket | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

export default function App() {
    const socketRef = useRef<Socket | null>(null);
    const [error, setError] = useState<string | null>(null); // Optional: To store error messages

    if (!socketRef.current) {
        socketRef.current = socketIOClient(ENDPOINT);
        console.log("Socket initialized:", socketRef.current);

        // Handle connection errors
        socketRef.current.on('connect_error', (err) => {
            console.error('Connection failed:', err);
            setError('Failed to connect to the server.'); // Optionally set error state
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
            setError('Disconnected from the server.'); // Optionally set error state
        });
    }

    useEffect(() => {
        return () => {
            // todo find out why this causes undefined socket
            //   socketRef.current?.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            <div className="App thin-margin">
                {error && <div className="error-message">{error}</div>} {/* Optional: Display error messages */}
                <Router>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Home</NavLink>
                    <NavLink to="/seating" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Seating</NavLink>
                    <NavLink to="/control" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Control</NavLink>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/seating" element={<Seating/>}/>
                        <Route path="/control" element={<Control/>}/>
                    </Routes>
                </Router>
            </div>
        </SocketContext.Provider>
    );
}

function MainPage() {
    const [studentNames, setStudentNames] = useState([''])

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
