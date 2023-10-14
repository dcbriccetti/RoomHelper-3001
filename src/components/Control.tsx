import React from "react";

export default function Control() {
    return (
        <div>
            <input id='enable-checks' type="checkbox"/>
            <label htmlFor="enable-checks">Statuses</label>
            <button id="clear-checks" type="button" className="btn btn-outline-primary btn-sm">Clear
            </button>

            <input id='enable-shares' type="checkbox" style={{marginLeft: '3em'}}/>
            <label htmlFor="enable-shares">Shares</label>
            <button id="clear-shares" type="button" className="btn btn-outline-primary btn-sm">Clear
            </button>

            <input id='enable-chat' type="checkbox" style={{marginLeft: '3em'}}/>
            <label htmlFor="enable-chat">Chat</label>
            <button id="clear-chat" type="button" className="btn btn-outline-primary btn-sm">Clear
            </button>
        </div>
    )
}