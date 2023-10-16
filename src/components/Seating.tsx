import React from 'react';

export default function Seating() {
    return (
        <div className="container">
            <textarea id="names" rows={8} placeholder="Names (Last, First)"></textarea>
            <button id="set-names" type="button" className="btn btn-outline-primary btn-sm">Set</button>
        </div>
    );
}
