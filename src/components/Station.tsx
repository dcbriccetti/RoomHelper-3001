import {useContext, useMemo} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {StationModel, Student} from "../types";
import {SelectedSeatIndexContext, useSettings} from "./contexts";
import './Station.css'
import StatusTags from "./StatusTags";
import {colorString, RgbValues, stationName} from "../stationUtils";

type Props = {
    index: number
    stationModel: StationModel
}

export default function Station({index, stationModel}: Props) {
    const settings = useSettings();
    const {selectedSeatIndex} = useContext(SelectedSeatIndexContext);
    const dynamicStyle = useMemo(() => {
        const selectedColor: RgbValues = [230, 230, 230];
        const stationColor = selectedSeatIndex === index ?
            selectedColor : settings?.normalColor || [0, 0, 0];
        return {backgroundColor: colorString(stationColor)};
    }, [index, selectedSeatIndex, settings]);
    const student: Student | undefined = stationModel.student
    const stationLabel = useMemo(() => stationName(index, settings?.columns || 1), [settings, index]);

    return (
        settings &&
        <Card className='station' sx={dynamicStyle}>
            <CardContent sx={{padding: 0}}>
                <div className="station-top-line">
                    <Typography sx={{fontSize: '1rem'}}>{stationLabel}</Typography>
                    <Typography sx={{fontSize: '0.6rem'}}>{stationModel.student?.ip || ''}</Typography>
                </div>
                {student &&
                    <div className="station-student">
                        <Typography align='center' sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                            {student.firstName}
                        </Typography>
                        <Typography align='center' sx={{fontSize: '0.9rem'}}>
                            {student.lastName}
                        </Typography>
                        <StatusTags visibilities={student.statusValues}/>
                    </div>}
            </CardContent>
        </Card>
    )
}
