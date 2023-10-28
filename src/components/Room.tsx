import React, {useContext} from "react"
import Station from "./Station"
import {StationModelsContext, useSettings} from "./contexts";

export default function Room() {
    const settings = useSettings();
    const {stationModels} = useContext(StationModelsContext);

    return (
        settings && stationModels ?
            <div className='stations' style={{
                gridTemplateRows: `repeat(${settings.rows}, max-content)`,
                gridTemplateColumns: `repeat(${settings.columns}, max-content)`
            }}>
                {
                    stationModels?.map((sm, i) =>
                        <Station key={i} index={i} stationModel={sm}/>
                    )
                }
            </div> : <div>Settings not loaded</div>
    );
}
