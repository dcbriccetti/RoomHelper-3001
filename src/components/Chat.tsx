import React, {useContext, useEffect, useState} from 'react';
import {ControlsAndChatContext, useSettings, useSocket} from "./contexts";
import {List, ListItem, Paper, TextField} from "@mui/material";

export default function Chat() {
    const [entryValue, setEntryValue] = useState('');
    const socket = useSocket();
    const settings = useSettings()
    const {chatMessages, setChatMessages} = useContext(ControlsAndChatContext)

    useEffect(() => { // todo receive messages even when Chat component is not mounted
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
    }, [setChatMessages, socket]);

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
            <TextField
                id="chat-msg"
                autoFocus
                label="Enter message"
                type="text"
                variant="outlined"
                value={entryValue}
                onChange={(e) => setEntryValue(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                margin="normal"
            />

            <Paper id="chat-log" style={{maxHeight: 300, overflow: 'auto'}}>
                <List>
                    {chatMessages.map((msg, index) => (
                        <ListItem key={index} sx={{padding: '2px'}}>
                            <div dangerouslySetInnerHTML={{ __html: msg }}></div>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};
