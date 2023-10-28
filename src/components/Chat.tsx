import React, {useContext, useEffect, useState} from 'react';
import {ControlsAndChatContext, useSettings, useSocket} from "./contexts";

export default function Chat() {
    const [entryValue, setEntryValue] = useState('');
    const socket = useSocket();
    const settings = useSettings()
    const {chatMessages, setChatMessages} = useContext(ControlsAndChatContext)

    useEffect(() => {
        const messageMessage = 'chat_msg';
        const clearMessage = 'clear_chat';

        const handleMessage = (msg: string) => {
            setChatMessages((prevMessages) => [msg, ...prevMessages]);
        };

        const handleClear = () => {
            setChatMessages([]);
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

            <div id={`chat-log`} className="col-12">
                {chatMessages.map((msg, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: msg }}></div>
                ))}
            </div>
        </div>
    );
};
