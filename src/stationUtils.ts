import {SeatedMessage, StationModel} from "./types";
import {SetStateAction} from "react";

export function updateStationModelOnSeated(
    {seatIndex, name, ip}: SeatedMessage,
    stationModels: StationModel[],
    setStationModels: (value: SetStateAction<StationModel[] | null>) => void
) {
    console.log("Seated:", seatIndex, name, ip);

    const updatedStationModels = [...stationModels];
    const updatedStation = {...updatedStationModels[seatIndex]}
    const [lastName, firstName] = name.split(', ');
    const statusValues = [false, false, false]
    updatedStation.student = {firstName, lastName, ip, statusValues};
    updatedStationModels[seatIndex] = updatedStation;
    setStationModels(updatedStationModels);
}

export function updateStationModelOnStatusSet(
    {seatIndex, key, value}: { seatIndex: number; key: string; value: string },
    stationModels: StationModel[],
    setStationModels: (value: SetStateAction<StationModel[] | null>) => void
) {
    const updatedStationModels = [...stationModels];
    const updatedStation = {...updatedStationModels[seatIndex]}
    if (updatedStation.student) {
        const updatedStudent = {...updatedStation.student}

        let index: number | null = null; // todo support names and emoji from settings
        if (key === "needHelp") {
            index = 0;
        } else if (key === "haveAnswer") {
            index = 1;
        } else if (key === "done") {
            index = 2;
        }

        if (index !== null) {
            updatedStudent.statusValues[index] = value !== null
            updatedStationModels[seatIndex] = updatedStation;
            setStationModels(updatedStationModels);
        }
    }
}

export function stationName(index: number, numColumns: number) {
    const row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / numColumns))
    const col = index % numColumns + 1
    return row + col  // A1, A2, ...
}

export type RgbValues = [number, number, number];

export function colorString([r, g, b]: RgbValues): string {
    return `rgb(${r}, ${g}, ${b})`
}
