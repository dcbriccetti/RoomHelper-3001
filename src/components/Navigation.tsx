import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import Seating from "./Seating";
import Control from "./Control";
import Contact from "./Contact";
import Calling from "./Calling";
import Chat from "./Chat";
import Poll from "./Poll";
import Room from "./Room";

type NavigationProps = {
    selectedSeatIndex: number | null;
    setSelectedSeatIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function Navigation(props: NavigationProps) {
    // @formatter:off
    const navLinksData = [
        {path: "/",        name: "Home",    component: <Room    />},
        {path: "/seating", name: "Seating", component: <Seating />},
        {path: "/control", name: "Control", component: <Control />},
        {path: "/contact", name: "Contact", component: <Contact />},
        {path: "/calling", name: "Calling", component: <Calling selectedSeatIndex={props.selectedSeatIndex}
                                                                setSelectedSeatIndex={props.setSelectedSeatIndex}/>},
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
