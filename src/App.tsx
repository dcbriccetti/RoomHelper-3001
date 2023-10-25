import React, {useEffect, useRef, useState} from 'react';
import {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./types";
import Navigation from "./components/Navigation";
import {SettingsContext, SocketContext} from './components/contexts';
import useFetchSettings from "./useFetchSettings";
import useSocketDispatcher from "./useSocketDispatcher";

export default function App() {
    const [selectedSeatIndex, setSelectedSeatIndex] = useState<number | null>(null);
    const stationModelsRef = useRef<StationModel[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const [errorDisplay, setErrorDisplay] = useState<string | null>(null);
    const {settings, stationModels, setStationModels, error} = useFetchSettings();
    if (error) setErrorDisplay(error);

    useSocketDispatcher(socketRef, setErrorDisplay, setStationModels, stationModelsRef);

    useEffect(() => {
        if (stationModels)
            stationModelsRef.current = stationModels;
    }, [stationModels]);

    return (
        <SettingsContext.Provider value={settings}>
            <SocketContext.Provider value={socketRef.current}>
                <div className="App thin-margin">
                    {errorDisplay && <div className="error-message">{errorDisplay}</div>}
                    <Navigation stationModels={stationModels} selectedSeatIndex={selectedSeatIndex}
                                setSelectedSeatIndex={setSelectedSeatIndex}/>
                </div>
            </SocketContext.Provider>
        </SettingsContext.Provider>
    );
}
