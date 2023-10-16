import React from "react";

export default function Contact() {
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
            <button id="ring-bell" type="button" className="btn btn-outline-primary btn-sm">Ring Bell</button>
        </div>
    )
}
