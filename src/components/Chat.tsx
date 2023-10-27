import React, {useEffect, useRef, useState} from 'react';
import {useSettings, useSocket} from "./contexts";

export default function Chat() {
    const [entryValue, setEntryValue] = useState('');
    const contentsRef = useRef<HTMLDivElement>(null);
    const socket = useSocket();
    const settings = useSettings()

    useEffect(() => {
        const messageMessage = 'chat_msg';
        const clearMessage = 'clear_chat';

        const handleMessage = (msg: string) => {
            contentsRef.current?.insertAdjacentHTML('afterbegin', msg);
        };

        const handleClear = () => {
            if (contentsRef.current) {
                contentsRef.current.innerHTML = '';
            }
        };

        socket?.on(messageMessage, handleMessage);
        socket?.on(clearMessage, handleClear);

        return () => {
            socket?.off(messageMessage, handleMessage);
            socket?.off(clearMessage, handleClear);
        };
    }, [socket]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msgLen = entryValue.length;
        if (settings && e.key === 'Enter' && msgLen > 0 && msgLen <= settings.chatMessageMaxLen) {
            const teacherId = -1
            socket?.emit("chat_msg", teacherId /* todo handle student indexes */, entryValue);
            setEntryValue('');
            // Implement chat delay logic if needed
            e.preventDefault(); // Prevent any default behavior associated with the Enter key
        }
    };

    return (
        <div id='chat'>
            <input
                id={`chat-msg`}
                autoFocus={true}
                type="text"
                placeholder="Enter message"
                className="col-12"
                value={entryValue}
                onChange={(e) => setEntryValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div>
                <div id={`chat-log`} className="col-12" ref={contentsRef}></div>
            </div>
        </div>
    );
};
