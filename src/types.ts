import React from "react";

export type Question = {
    id: number;
    text: string;
};

export type Answer = {
    seatIndex: number;
    studentName: string;
    text: string;
};

type Status = [string, string, string];

interface Period {
    periodNumber: number;
    startTime: string;
    endTime: string;
}

export interface Settings {
    teacherName: string;
    missingSeatIndexes: number[];
    chatEnabled: boolean;
    sharesEnabled: boolean;
    checksEnabled: boolean;
    shares: string[];  // Assuming shares is an array of strings
    statuses: Status[];
    chatDelayMs: number;
    chatMessageMaxLen: number;
    allowedSharesDomains: string[];
    normalColor: [number, number, number];
    warningColor: [number, number, number];
    columns: number;
    rows: number;
    periods?: Period[];
}

export interface StationModel {
    index: number
    row: number
    column: number
    student?: Student
}

export interface Student {
    ip: string
    firstName: string
    lastName: string
    statusValues: boolean[]
}

export type StatusSetMessage = {
    seatIndex: number
    key: string
    value: string
}

export type SeatedMessage = {
    seatIndex: number
    name: string
    ip: string
}

export type UseFetchSettingsReturnType = {
    settings: Settings | null;
    stationModels: StationModel[] | null;
    setStationModels: React.Dispatch<React.SetStateAction<StationModel[] | null>>
    error: string | null;
};
