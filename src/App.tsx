import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import { Socket } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./StationModel";
import Room from "./components/Room";
import Tabs from "./components/Tabs";
import socketIOClient from "socket.io-client";
import Poll from "./components/Poll";

const SocketContext = React.createContext<Socket | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/room" element={<Poll />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
    const [tagVisibilities, setTagVisibilities] = useState([false, false, false])
    const [studentNames, setStudentNames] = useState([''])
    let HOSTNAME = "http://127.0.0.1:5000";
    const ENDPOINT = HOSTNAME + "/teacher";

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

    const socket = socketIOClient(ENDPOINT);
    socket.on("message", (data: string) => {
      console.log(data);
    });

    // Send a message to the server after connecting
    socket.emit("message", "Hello from React!");

    const stationData: StationModel[] = studentNames.map((name, i) => {
        // split name into firstName and lastName
        const [firstName, lastName] = name.split(' ');
        return ({
            index: i,
            ip: '10.0.0.' + (i + 1),
            firstName: firstName,
            lastName: lastName,
            x: i * 50,
            y: 0,
            tagVisibilities: [...tagVisibilities], // Spread to create a new array copy
        });
    })

    return (
        <SocketContext.Provider value={socket}>
            <NavLink to="/room">Room</NavLink>
            <div className="App container">
            <h3>RoomHelper 3001</h3>
            <Room stationModels={stationData}/>
            <Tabs/>
            <p/>
            <p style={{fontSize: '70%'}}><a href="https://davebsoft.com">Dave Briccetti Software LLC</a></p>
            <br/>
        </div>
        </SocketContext.Provider>
    );
}
