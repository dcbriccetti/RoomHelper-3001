import React, {useContext, useState} from "react"
import Station from "./Station"
import {StationModelsContext, useSettings} from "./contexts";
import './Room.css'
import {Checkbox, FormControlLabel} from "@mui/material";

export default function Room() {
    const settings = useSettings();
    const [teacherView, setTeacherView] = useState(false);
    const {stationModels} = useContext(StationModelsContext);

    const handleTeacherViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherView(event.target.checked);
    };

    return settings && stationModels ?
        <>
            <div className='room' style={{
                gridTemplateRows: `repeat(${settings.rows}, max-content)`,
                gridTemplateColumns: `repeat(${settings.columns}, max-content)`
            }}>
                {
                    (teacherView ? [...stationModels].reverse() : stationModels).map((sm, i) =>
                        <Station key={i}
                                 index={teacherView ? stationModels.length - i - 1 : i}
                                 stationModel={sm}/>
                    )
                }

            </div>
            <FormControlLabel
                control={<Checkbox checked={teacherView} onChange={handleTeacherViewChange}/>}
                label="Teacher View"
            />
        </>
        : <div>Settings not loaded</div>;
}
