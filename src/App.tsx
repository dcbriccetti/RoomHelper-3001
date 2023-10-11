import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationData} from "./StationData";
import Stations from "./components/Stations";

function App() {
    const [tagVisibilities, setTagVisibilities] = useState([false, false, false])

    const stationData: StationData[] = Array.from({length: 5}).map((_, i) => ({
        index: i,
        ip: '10.0.0.' + (i + 1),
        studentFirstName: 'Dave',
        studentLastName: 'Briccetti',
        x: i * 50,
        y: 0,
        tagVisibilities: [...tagVisibilities], // Spread to create a new array copy
    }))

    return (
        <div className="App container">
            <h3>RoomHelper 3000</h3>
            <Stations sds={stationData}/>
            <button className='btn btn-primary' onClick={() => {
                setTagVisibilities([true, true, true]);
            }}>Show all</button>
        </div>
    );
}

export default App;
