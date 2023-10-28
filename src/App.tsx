import React, {useEffect, useRef, useState} from 'react';
import {Socket} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {StationModel} from "./types";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import {ControlsContext, SelectedSeatIndexContext, SettingsContext, SocketContext, StationModelsContext} from './components/contexts';
import useFetchSettings from "./useFetchSettings";
import useSocketDispatcher from "./useSocketDispatcher";

export default function App() {
    const [selectedSeatIndex, setSelectedSeatIndex] = useState<number | null>(null);
    const stationModelsRef = useRef<StationModel[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const [errorDisplay, setErrorDisplay] = useState<string | null>(null);
    const {settings, stationModels, setStationModels, error: fetchError} = useFetchSettings();

    useSocketDispatcher(socketRef, setErrorDisplay, setStationModels, stationModelsRef);

    useEffect(() => {
        if (fetchError) {
            setErrorDisplay(fetchError);
        }
    }, [fetchError]);

    const [isChecksEnabled, setChecksEnabled] = useState(false);
    const [isSharesEnabled, setSharesEnabled] = useState(false);
    const [isChatEnabled, setChatEnabled] = useState(false);

    useEffect(() => {
        if (settings) {
            setChecksEnabled(settings.checksEnabled);
            setSharesEnabled(settings.sharesEnabled);
            setChatEnabled(settings.chatEnabled);
        }
    }, [settings]);

    useEffect(() => {
        if (stationModels)
            stationModelsRef.current = stationModels;
    }, [stationModels]);

    return (
        <SettingsContext.Provider value={settings}>
            <SocketContext.Provider value={socketRef.current}>
                <StationModelsContext.Provider value={{stationModels, setStationModels}}>
                    <SelectedSeatIndexContext.Provider value={{selectedSeatIndex, setSelectedSeatIndex}}>
                        <ControlsContext.Provider value={{
                            isChecksEnabled, setChecksEnabled,
                            isSharesEnabled, setSharesEnabled,
                            isChatEnabled, setChatEnabled
                        }}>
                            <div className="App thin-margin">
                                <h2>RoomHelper 3001</h2>
                                {errorDisplay && <div className="error-message">{errorDisplay}</div>}
                                <Navigation/>
                                <Footer/>
                            </div>
                        </ControlsContext.Provider>
                    </SelectedSeatIndexContext.Provider>
                </StationModelsContext.Provider>
            </SocketContext.Provider>
        </SettingsContext.Provider>
    );
}
