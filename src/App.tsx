import React, {useState} from 'react';
import './App.css';
import Stations from "./components/Stations";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [tagVisibilities, setTagVisibilities] = useState([false, false, false])
    return (
        <div className="App container">
            <h3>RoomHelper 3000</h3>
            <Stations tagVisibilities={tagVisibilities}/>
            <button className='btn btn-primary' onClick={() => setTagVisibilities([true, true, true])}>Show all</button>
        </div>
    );
}

export default App;
