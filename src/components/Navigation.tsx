import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import './Navigation.css'
import Seating from "./Seating";
import Control from "./Control";
import Contact from "./Contact";
import Calling from "./Calling";
import Chat from "./Chat";
import Poll from "./Poll";
import Room from "./Room";

export default function Navigation() {
    // @formatter:off
    const navLinksData = [
        {path: "/",        name: "Home",    component: <Room    />},
        {path: "/seating", name: "Seating", component: <Seating />},
        {path: "/control", name: "Control", component: <Control />},
        {path: "/contact", name: "Contact", component: <Contact />},
        {path: "/calling", name: "Calling", component: <Calling />},
        {path: "/chat",    name: "Chat",    component: <Chat    />},
        {path: "/poll",    name: "Poll",    component: <Poll    />},
    ];
    // @formatter:on

    return (
        <nav>
            <Router>
                <div id="nav-links">
                    {navLinksData.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({isActive}) => (isActive ? 'active-link' : 'inactive-link')}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <Routes>
                    {navLinksData.map(link => (
                        <Route key={link.path} path={link.path} element={link.component}/>
                    ))}
                </Routes>
            </Router>
        </nav>
    )
}
