import React from "react";

export default function Contact() {
    return (
        <div>
            <button id="ring-bell" type="button" className="btn btn-outline-primary btn-sm">Bell</button>
            <textarea
                id="teacher-msg"
                style={{marginLeft: '1em'}}
                rows={2} cols={40}
                placeholder="Message from Teacher">
            </textarea>
        </div>
    )
}