import React, {useContext} from "react"
import Station from "./Station"
import {StationModelsContext, useSettings} from "./contexts";

export default function Room() {
    const settings = useSettings();
    const {stationModels} = useContext(StationModelsContext);

    function stationName(index: number) {
        if (!settings) return ''
        const row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / settings.columns))
        const col = index % settings.columns + 1
        return row + col  // A1, A2, ...
    }

    return (
        settings && stationModels ?
            <div className='stations' style={{
                gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
                gridTemplateColumns: `repeat(${settings.columns}, 1fr)`
            }}>
                {
                    stationModels?.map((sm, i) =>
                        <Station key={i} stationName={stationName(i)} student={sm.student}/>
                    )
                }
            </div> : <div>Settings not loaded</div>
    );
}
