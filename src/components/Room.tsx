import React, {useContext, useState} from "react"
import Station from "./Station"
import {StationModelsContext, useSettings} from "./contexts";
import './Room.css'
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {stationName} from "../stationUtils";

type RoomProps = {
    seatStudent?: (seatIndex: number) => void;
}

export default function Room({seatStudent}: RoomProps) {
    const settings = useSettings();
    const [teacherView, setTeacherView] = useState(false);
    const {stationModels} = useContext(StationModelsContext);

    const handleTeacherViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherView(event.target.checked);
    };
    const studentRole = seatStudent != null;

    const nonNullStationModels = stationModels || [];
    const orderedStationModels = teacherView ? [...nonNullStationModels].reverse() : nonNullStationModels;

    return settings && stationModels ?
        <>
            <div className='room' style={{
                gridTemplateRows: `repeat(${settings.rows}, max-content)`,
                gridTemplateColumns: `repeat(${settings.columns}, max-content)`
            }}>
                {
                    orderedStationModels.map((stationModel, i) =>
                        studentRole ?
                            <Button key={i} variant='outlined' onClick={() => {
                                console.log("setting seat index to", i);
                                seatStudent(i);
                            }}>
                                {stationName(stationModel.index, settings.columns)}
                            </Button>
                            :
                            <Station key={i}
                                     index={teacherView ? stationModels.length - i - 1 : i}
                                     stationModel={stationModel}/>
                    )
                }

            </div>
            {!studentRole && <FormControlLabel
                control={<Checkbox checked={teacherView} onChange={handleTeacherViewChange}/>}
                label="Teacher View"
            />}
        </>
        : <div></div>;
}
