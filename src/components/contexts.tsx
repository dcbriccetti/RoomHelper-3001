import React, {useContext} from "react";
import {Socket} from "socket.io-client";
import {Settings, StationModel} from "../types";

export const SocketContext = React.createContext<Socket | null>(null);
export const SettingsContext = React.createContext<Settings | null>(null);

type StationModelsContextType = {
  stationModels: StationModel[] | null;
  setStationModels: React.Dispatch<React.SetStateAction<StationModel[] | null>>;
};

export const StationModelsContext = React.createContext<StationModelsContextType>({
  stationModels: null,
  setStationModels: () => {}
});

export function useSocket() {
    return useContext(SocketContext);
}

export function useSettings() {
    return useContext(SettingsContext);
}

type SelectedSeatIndexContextType = {
  selectedSeatIndex: number | null;
  setSelectedSeatIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SelectedSeatIndexContext = React.createContext<SelectedSeatIndexContextType>({
  selectedSeatIndex: null,
  setSelectedSeatIndex: () => {}
});

