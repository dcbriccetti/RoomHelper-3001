import React, {useState} from "react";
import {useSocket} from "./contexts";
import {TextField, Typography} from "@mui/material";

export default function Contact() {
    const socket = useSocket();
    const [message, setMessage] = useState<string>('');

    return (
        <div id="contact">
            <div style={{marginBottom: '8px'}}><Typography>Send a message to the students:</Typography></div>
            <div>
                <TextField
                    id="teacher-msg"
                    sx={{marginBottom: '10px'}}
                    label="Message from the Teacher"
                    multiline
                    minRows={4}
                    value={message}
                    onChange={e => {
                        setMessage(e.target.value);
                        socket?.emit('teacher_msg', e.target.value);
                    }}
                />
            </div>
            <button id="ring-bell" type="button" onClick={() => socket?.emit('ring_bell')}
                    className="btn btn-outline-primary btn-sm">
                Ring Bell
            </button>
        </div>
    )
}
