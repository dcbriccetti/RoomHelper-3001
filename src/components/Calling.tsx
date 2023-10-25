import React, {Dispatch, SetStateAction, useState} from "react";
import {useSocket} from "./contexts";

type Props = {
    selectedSeatIndex: number | null;
    setSelectedSeatIndex: Dispatch<SetStateAction<number | null>>;
};

export default function Calling({selectedSeatIndex, setSelectedSeatIndex}: Props) {
    const socket = useSocket()
    const [numCalls, setNumCalls] = useState(2);

    function handleRandomSetClick() {
        console.log("Random set clicked", numCalls);
        socket?.emit('random_set', numCalls);
    }

    function handleChooseClick(anyone: boolean) {
        console.log("Choose clicked", anyone);
        socket?.emit('random_call', anyone, (i: number) => {
            setSelectedSeatIndex(i === -1 ? null : i);
        });
    }

    function handleClearClick() {
        console.log("Clear clicked");
    }

    return (
        <div id="calling">
            <h1>Calling</h1>
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
            Hello {selectedSeatIndex}
        </div>
    )
}
