import React, {useState} from "react";
import Seating from "./Seating";
import Calling from "./Calling";
import Contact from "./Contact";
import Control from "./Control";
import Poll from "./Poll";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("seating")

    return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="seating-tab" data-toggle="tab" href="#seating" role="tab"
                       aria-controls="seating" aria-selected="true">Seating</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="calling-tab" data-toggle="tab" href="#calling" role="tab"
                       aria-controls="calling" aria-selected="false">Calling</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                       aria-controls="contact" aria-selected="false">Contact</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="control-tab" data-toggle="tab" href="#control" role="tab"
                       aria-controls="control" aria-selected="false">Control</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="poll-tab" data-toggle="tab" href="#poll" role="tab" aria-controls="poll"
                       aria-selected="false">Poll</a>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane show active" id="seating" role="tabpanel" aria-labelledby="seating-tab">
                    <Seating/>
                </div>
                <div className="tab-pane" id="calling" role="tabpanel" aria-labelledby="calling-tab">
                    <Calling/>
                </div>
                <div className="tab-pane" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <Contact/>
                </div>
                <div className="tab-pane" id="control" role="tabpanel" aria-labelledby="control-tab">
                    <Control/>
                </div>
                <div className="tab-pane" id="poll" role="tabpanel" aria-labelledby="poll-tab">
                    <Poll/>
                </div>
            </div>
        </div>
    )
}