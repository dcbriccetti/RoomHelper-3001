import React, {useContext} from "react";
import {Socket} from "socket.io-client";
import {Settings} from "../types";

export const SocketContext = React.createContext<Socket | null>(null);
export const SettingsContext = React.createContext<Settings | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function useSettings() {
    return useContext(SettingsContext);
}
