import React, { useState, useEffect, useRef } from 'react';
import {useSocket} from "../App";

interface MessengerProps {
    prefix: string;
}

const Chat: React.FC<MessengerProps> = ({ prefix }) => {
    const [entryValue, setEntryValue] = useState('');
    const contentsRef = useRef<HTMLDivElement>(null);
    const socket = useSocket();
    if (!socket) {
        throw new Error("Socket is null or undefined");
    }

    useEffect(() => {
        const messageMessage = prefix + '_msg';
        const clearMessage = 'clear_' + prefix;

        const handleMessage = (msg: string) => {
            contentsRef.current?.insertAdjacentHTML('afterbegin', msg);
        };

        const handleClear = () => {
            if (contentsRef.current) {
                contentsRef.current.innerHTML = '';
            }
        };

        socket.on(messageMessage, handleMessage);
        socket.on(clearMessage, handleClear);

        return () => {
            socket.off(messageMessage, handleMessage);
            socket.off(clearMessage, handleClear);
        };
    }, [socket, prefix]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msgLen = entryValue.length;
        if (e.key === 'Enter' && msgLen > 0 && msgLen < 150 /* todo from settings */) {
            const teacherId = -1
            socket?.emit(prefix + '_msg', teacherId /* todo handle student indexes */, entryValue);
            setEntryValue('');
            // Implement chat delay logic if needed
            e.preventDefault(); // Prevent any default behavior associated with the Enter key
        }
    };

    return (
        <div id={prefix} style={{ display: prefix === "chat" ? "block" : "none" }}>
            <h1>{prefix.charAt(0).toUpperCase() + prefix.slice(1)}</h1>
            <div>
                <input
                    id={`${prefix}-msg`}
                    autoFocus={true}
                    type="text"
                    placeholder="Enter message"
                    className="col-12"
                    value={entryValue}
                    onChange={(e) => setEntryValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div>
                <div id={`${prefix}-log`} className="col-12" ref={contentsRef}></div>
            </div>
        </div>
    );
};

export default Chat;
