import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import socketIOClient, {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./StationModel";
import Seating from "./components/Seating";
import Calling from "./components/Calling";
import Contact from "./components/Contact";
import Control from "./components/Control";
import Poll from "./components/Poll";
import Room from './components/Room';

let HOSTNAME = "http://127.0.0.1:5000";
const ENDPOINT = HOSTNAME + "/teacher";

const SocketContext = React.createContext<Socket | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

export default function App() {
    const socket = socketIOClient(ENDPOINT);
    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                <Router>
                    <NavLink to="/">Home</NavLink>&nbsp;
                    <NavLink to="/seating">Seating</NavLink>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/seating" element={<Seating/>}/>
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
                console.log(data);
                setStudentNames(data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, [HOSTNAME]);


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
