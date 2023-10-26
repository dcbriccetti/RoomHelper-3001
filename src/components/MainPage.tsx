import Room from "./Room";
import {StationModelsContext, useSettings} from "./contexts";
import {useContext} from "react";

export function MainPage() {
    const settings = useSettings();
    const { stationModels } = useContext(StationModelsContext);

    return (
        settings &&
        <Room stationModels={stationModels} rows={settings.rows} columns={settings.columns}/>
    );
}
