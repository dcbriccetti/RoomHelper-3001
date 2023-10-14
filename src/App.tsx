import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./StationModel";
import Room from "./components/Room";
import NameInput from "./components/NameInput";
import Tabs from "./components/Tabs";

export default function App() {
    const [tagVisibilities, setTagVisibilities] = useState([false, false, false])

    const stationData: StationModel[] = Array.from({length: 5}).map((_, i) => ({
        index: i,
        ip: '10.0.0.' + (i + 1),
        firstName: 'Dave',
        lastName: 'Briccetti',
        x: i * 50,
        y: 0,
        tagVisibilities: [...tagVisibilities], // Spread to create a new array copy
    }))

    return (
        <div className="App container">
            <h3>RoomHelper 3000</h3>
            <Room stationModels={stationData}/>
            <NameInput/>
            <Tabs/>
            <p/>
            <p style={{fontSize: '70%'}}><a href="https://davebsoft.com">Dave Briccetti Software LLC</a></p>
            <br/>
        </div>
    );
}
