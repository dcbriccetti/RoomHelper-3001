import React, {useEffect, useState} from "react"
import Station from "./Station"
import {StationModel} from "../StationModel"
import {useSocket} from "../App";

interface Props {
    stationModels: StationModel[]
    rows: number
    columns: number
}

export default function Room(props: Props) {
    const socket = useSocket();
    if (!socket) {
        throw new Error("Socket is null or undefined");
    }

    function stationName(index: number) {
        const row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / props.columns))
        const col = index % props.columns + 1
        return row + col  // A1, A2, ...
    }

    const [stationModels, setStationModels] = useState(props.stationModels)
    useEffect(() => {
        setStationModels(props.stationModels)
    }, [props.stationModels])

    const stationsStyle = {
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${props.columns}, 1fr)`
    }

    return (
        <div className='stations' style={stationsStyle}>
            {
                stationModels.map((sm, i) =>
                    <Station
                        key={i}
                        stationName={stationName(i)}
                        ip={sm.ip}
                        studentFirstName={sm.firstName} studentLastName={sm.lastName}/>
                )
            }
        </div>
    );
}
