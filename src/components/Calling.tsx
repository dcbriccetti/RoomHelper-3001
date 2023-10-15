import React from "react";

export default function Calling() {
    return (
        <div>
            <button className="btn btn-outline-primary btn-sm" id="random-set">Set</button>
            <input type="number" defaultValue='2' style={{width: '2.5em'}} id="random-set-number"/>
            Call:
            <button className="btn btn-outline-primary btn-sm" id="choose">Any</button>
            <button className="btn btn-outline-primary btn-sm" id="choose-with-answer">With Answer</button>
            <button className="btn btn-outline-secondary btn-sm" id="choose-reset">Reset</button>
        </div>
    )
}