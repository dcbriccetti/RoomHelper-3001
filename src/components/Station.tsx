import {StationModel} from "../types";
import {SelectedSeatIndexContext, useSettings} from "./contexts";
import {useContext} from "react";

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
        <div className='station' style={stationStyle}>
            <div className="station-top-line">
                <span className='station-name left-text'>{stationName(index)}</span>
                <span className='right-text'>{stationModel.student?.ip || ''}</span>
            </div>
            <div className='station-student-first-name'>{stationModel.student?.firstName || ''}</div>
            <div className='station-student-last-name'>{stationModel.student?.lastName || ''}</div>
        </div>
    )
}
