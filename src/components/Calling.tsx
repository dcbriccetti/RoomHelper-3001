import React, {useContext, useState} from "react";
import {SelectedSeatIndexContext, StationModelsContext, useSocket} from "./contexts";
import {Student} from "../types";
import Room from "./Room";

export default function Calling() {
    const socket = useSocket()
    const [numCalls, setNumCalls] = useState(2);
    const { stationModels } = useContext(StationModelsContext);
    const { selectedSeatIndex, setSelectedSeatIndex } = useContext(SelectedSeatIndexContext);

    function handleRandomSetClick() {
        socket?.emit('random_set', numCalls);
    }

    function handleChooseClick(anyone: boolean) {
        const NO_ONE_SELECTED = -1;
        socket?.emit('random_call', anyone, (selected_index: number) =>
            setSelectedSeatIndex(selected_index === NO_ONE_SELECTED ? null : selected_index));
    }

    function handleClearClick() {
        setSelectedSeatIndex(null);
    }

    const selectedStudent: Student | null = (selectedSeatIndex !== null && stationModels) ?
        stationModels[selectedSeatIndex].student || null : null;

    return (
        <div id="calling">
            <Room/>
            <div style={{marginBottom: '4px'}}>
                <label htmlFor="random-set-number">Number of times each may be called: </label>
                <input type="number" defaultValue={numCalls}
                       style={{width: '2.5em', marginRight: '.3em'}} id="random-set-number"
                       onChange={e => setNumCalls(parseInt(e.target.value))}
                />
                <button className="btn btn-primary" id="random-set"
                        onClick={handleRandomSetClick}>Set</button>
            </div>
            <button onClick={() => handleChooseClick(true)} className="btn btn-primary"
                    id="choose">Call Anyone</button>
            <button onClick={() => handleChooseClick(false)} className="btn btn-primary"
                    id="choose-with-answer">Call Someone with Answer</button>
            <button onClick={handleClearClick} className="btn btn-secondary"
                    id="choose-reset">Reset</button>
            {selectedStudent ?
                <div>Selected {`${selectedStudent.firstName} ${selectedStudent.lastName}`}</div> : <span/>}
        </div>
    )
}
