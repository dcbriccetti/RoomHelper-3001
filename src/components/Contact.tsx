import React from "react";
import {useSocket} from "../App";

export default function Contact() {
    const socket = useSocket();
    function handleClick() {
        socket?.emit('ring_bell');
    }

    return (
        <div id="contact">
            <h1>Contact</h1>
            <h6>Send a message to the students:</h6>
            <textarea
                id="teacher-msg"
                className="form-control"
                style={{height: '4em'}}
                placeholder="Message from the Teacher">
            </textarea>
            <br/>
            <button id="ring-bell" type="button" onClick={handleClick} className="btn btn-outline-primary btn-sm">Ring Bell</button>
        </div>
    )
}
