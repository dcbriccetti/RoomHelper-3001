import { TextField, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSocket} from "../../components/contexts";

export default function Poll() {
    const [entryValue, setEntryValue] = useState('');
    const [question, setQuestion] = useState<string>('');
    const socket = useSocket();

    useEffect(() => {
        console.log('socket', socket)
        socket?.on('start_poll', msg => {
            console.log('received start_poll', msg)
            setEntryValue(msg.trim());
        });
        return () => {
            socket?.off('start_poll')
        }
    }, [socket]);

    function handleKeyDown() {
        // TODO
    }

    return (
        <>
            {question && (
                <div>
                    <Typography variant="h5">Student Poll</Typography>
                    <Typography>{question}</Typography>
                    <TextField
                        id="text-answer"
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
                </div>
            )}
        </>
    );
}
