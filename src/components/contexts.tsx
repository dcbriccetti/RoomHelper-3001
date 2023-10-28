import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {Socket} from "socket.io-client";
import {Settings, StationModel} from "../types";

export const SocketContext = createContext<Socket | null>(null);
export const SettingsContext = createContext<Settings | null>(null);

type StationModelsContextType = {
    stationModels: StationModel[] | null;
    setStationModels: Dispatch<SetStateAction<StationModel[] | null>>;
};

export const StationModelsContext = createContext<StationModelsContextType>({
    stationModels: null,
    setStationModels: () => {
    }
});

export function useSocket() {
    return useContext(SocketContext);
}

export function useSettings() {
    return useContext(SettingsContext);
}

type SelectedSeatIndexContextType = {
    selectedSeatIndex: number | null;
    setSelectedSeatIndex: Dispatch<SetStateAction<number | null>>;
};

export const SelectedSeatIndexContext = createContext<SelectedSeatIndexContextType>({
    selectedSeatIndex: null,
    setSelectedSeatIndex: () => {
    }
});

export type ControlsAndChatContextType = {
    isChecksEnabled: boolean;
    setChecksEnabled: Dispatch<SetStateAction<boolean>>;
    isSharesEnabled: boolean;
    setSharesEnabled: Dispatch<SetStateAction<boolean>>;
    isChatEnabled: boolean;
    setChatEnabled: Dispatch<SetStateAction<boolean>>;
    chatMessages: string[];
    setChatMessages: Dispatch<SetStateAction<string[]>>;
};

export const ControlsAndChatContext = createContext<ControlsAndChatContextType>({
    isChecksEnabled: false,
    setChecksEnabled: () => {},
    isSharesEnabled: false,
    setSharesEnabled: () => {},
    isChatEnabled: false,
    setChatEnabled: () => {},
    chatMessages: [],
    setChatMessages: () => {}
});
