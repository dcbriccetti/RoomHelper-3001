import React from "react";

export default function Calling() {
    return (
        <div id="calling">
            <h1>Calling</h1>
            <div>
                <label htmlFor="random-set-number">Number of times each may be called: </label>
                <input type="number" defaultValue='2' style={{width: '2.5em', marginRight: '.3em'}} id="random-set-number"/>
                <button className="btn btn-outline-primary btn-sm" id="random-set">Set</button>
            </div>
            Call:
            <button className="btn btn-outline-primary btn-sm" id="choose">Any</button>
            <button className="btn btn-outline-primary btn-sm" id="choose-with-answer">With Answer</button>
            <button className="btn btn-outline-secondary btn-sm" id="choose-reset">Reset</button>
        </div>
    )
}
