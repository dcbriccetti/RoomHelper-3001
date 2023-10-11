import Station from "./Station";
import {StationData} from "../StationData";
import React, {useEffect, useState} from "react";

interface Props {
    sds: StationData[]
}

export default function Stations({sds}: Props) {

    function stationName(index: number) {
        return '' + (index + 1)
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const stationName = e.dataTransfer.getData('text/plain')
        const index = parseInt(stationName) - 1
        // Retrieve the offsets from the dataTransfer object
        const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));
        const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));

        // Get the bounding rectangle of the parent container
        const rect = e.currentTarget.getBoundingClientRect();
        // Adjust the position using the offsets
        const newCoords = {
            x: e.clientX - rect.left - offsetX,
            y: e.clientY - rect.top - offsetY,
        };

        // update the specific item in the stationData array
        const updatedData = [...stationData];
        updatedData[index] = {
            ...updatedData[index],
            x: newCoords.x,
            y: newCoords.y,
        };

        setStationData(updatedData);
    }

    const [stationData, setStationData] = useState(sds);
    useEffect(() => {
        setStationData(sds);
    }, [sds]);

    return (
        <div className='stations' onDragOver={handleDragOver} onDrop={handleDrop}>
            {
                stationData.map((sd, i) => {
                        return <Station
                            key={i}
                            x={sd.x}
                            y={sd.y}
                            stationName={stationName(i)}
                            ip={sd.ip}
                            tagVisibilities={sd.tagVisibilities}
                            studentFirstName={sd.studentFirstName}
                            studentLastName={sd.studentLastName}/>;
                    }
                )
            }
        </div>
    );
}
