import Station from "./Station"
import {StationModel} from "../StationModel"
import React, {useEffect, useState} from "react"

interface Props {
    stationModels: StationModel[]
}

export default function Room(props: Props) {

    function stationName(index: number) {
        return '' + (index + 1)
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const droppedData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { stationName, offsetX, offsetY } = droppedData;
        const index = parseInt(stationName) - 1
        const rect: DOMRect = e.currentTarget.getBoundingClientRect()
        // update the specific item in the stationData array
        const updatedStationModels = [...stationModels]
        updatedStationModels[index] = {
            ...updatedStationModels[index],
            x: e.clientX - rect.left - offsetX,
            y: e.clientY - rect.top - offsetY,
        }

        setStationModels(updatedStationModels)
    }

    const [stationModels, setStationModels] = useState(props.stationModels)
    useEffect(() => {
        setStationModels(props.stationModels)
    }, [props.stationModels])

    return (
        <div className='stations' onDragOver={handleDragOver} onDrop={handleDrop}>
            {
                stationModels.map((sm, i) => {
                        return <Station
                            key={i}
                            x={sm.x} y={sm.y}
                            stationName={stationName(i)}
                            ip={sm.ip}
                            tagVisibilities={sm.tagVisibilities}
                            studentFirstName={sm.firstName} studentLastName={sm.lastName}/>
                    }
                )
            }
        </div>
    );
}
