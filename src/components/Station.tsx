import {SeatedMessage, StationModel} from "../types";
import {SelectedSeatIndexContext, useSettings} from "./contexts";
import {SetStateAction, useContext} from "react";
import './Station.css'
import StatusTags from "./StatusTags";
import {Card, CardContent} from "@mui/material";

type Props = {
    index: number
    stationModel: StationModel
}

type RgbValues = [number, number, number];

export default function Station({index, stationModel}: Props) {
    const settings = useSettings();
    const {selectedSeatIndex} = useContext(SelectedSeatIndexContext);

    function stationName(index: number) {
        if (!settings) return ''
        const row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / settings.columns))
        const col = index % settings.columns + 1
        return row + col  // A1, A2, ...
    }

    const selectedColor: RgbValues = [230, 230, 230];

    function colorString([r, g, b]: RgbValues): string {
        return `rgb(${r}, ${g}, ${b})`
    }

    const stationColor = selectedSeatIndex === index ? selectedColor : settings?.normalColor || [0, 0, 0,];
    const stationStyle = {backgroundColor: colorString(stationColor)}

    return (
        <Card className='station' sx={stationStyle}>
            <CardContent sx={{padding: 0}}>
                <div className="station-top-line">
                    <span className='station-name'>{stationName(index)}</span>
                    <span>{stationModel.student?.ip || ''}</span>
                </div>
                {stationModel.student && <div className="station-student">
                    <div className='station-student-first-name'>{stationModel.student.firstName || ''}</div>
                    <div className='station-student-last-name'>{stationModel.student.lastName || ''}</div>
                    <StatusTags visibilities={stationModel.student.statusValues}/>
                </div>}
            </CardContent>
        </Card>
    )
}

export function handleSeated(
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

export function handleStatusSet(
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

