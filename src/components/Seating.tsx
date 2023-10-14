import React from "react";

export default function Seating() {
    return (
        <div>
            <span>
                <input id='teacher-view' type="checkbox" checked/>
                <label htmlFor="teacher-view">Teacher View</label>
            </span>
            <textarea id="names" rows={8} placeholder="Names (Last, First)"></textarea>
            <label>
                <input id='assign-seats' type="checkbox"/> Assign Seats
            </label>
            <button id="set-names" type="button" className="btn btn-outline-primary btn-sm">Set</button>
        </div>
    )
}