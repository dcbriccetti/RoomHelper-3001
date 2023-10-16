import React, {useState} from "react";
import {useSocket} from "../App";

export default function Control() {
    const [isChecksEnabled, setChecksEnabled] = useState(false);
    const [isSharesEnabled, setSharesEnabled] = useState(false);
    const [isChatEnabled, setChatEnabled] = useState(false);
    const socket = useSocket();

    return (
        <div id="control">
            <h1>Control</h1>
            <p>Enable/disable the following features:</p>

            <div>
                <input
                    id='enable-checks'
                    type="checkbox"
                    checked={isChecksEnabled}
                    onChange={() => setChecksEnabled(prev => !prev)}
                />
                <label htmlFor="enable-checks"><span className="control-name">Statuses</span></label>
                <button
                    id="clear-checks"
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                        console.log('clearing checks.', socket?.id);
                        socket?.emit('clear_checks');
                        console.log('cleared checks.');
                    }}
                >
                    Clear
                </button>
            </div>

            <div>
                <input
                    id='enable-shares'
                    type="checkbox"
                    checked={isSharesEnabled}
                    onChange={() => setSharesEnabled(prev => !prev)}
                />
                <label htmlFor="enable-shares"><span className="control-name">Shares</span></label>
                <button
                    id="clear-shares"
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => socket?.emit('clear_shares')}
                >
                    Clear
                </button>
            </div>

            <div>
                <input
                    id='enable-chat'
                    type="checkbox"
                    checked={isChatEnabled}
                    onChange={() => setChatEnabled(prev => !prev)}
                />
                <label htmlFor="enable-chat"><span className="control-name">Chat</span></label>
                <button
                    id="clear-chat"
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => socket?.emit('clear_chat')}
                >
                    Clear
                </button>
            </div>

        </div>
    );
}
