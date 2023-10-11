import Station from "./Station";
import React from "react";

interface Props {
    tagVisibilities: boolean[]
}

export default function Stations({tagVisibilities}: Props) {
    const rows = 3
    const cols = 7

    function stationName(index: number) {
        const rowFrom0 = Math.floor(index / cols);
        const colFrom0 = index % cols;
        return String.fromCharCode('A'.charCodeAt(0) + rowFrom0) + (colFrom0 + 1);
    }

    return (
        <div className='stations'>
            {
                Array.from({length: rows * cols}).map((_, i) =>
                    <Station key={i} stationName={stationName(i)} ip={''} tagVisibilities={tagVisibilities}/>
                )
            }
        </div>
    );
}
