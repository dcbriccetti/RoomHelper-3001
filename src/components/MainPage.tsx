import {StationModel} from "../types";
import Room from "./Room";
import {useSettings} from "./contexts";
import Footer from "./Footer";

type Props = {
    stationModels: StationModel[] | null
}

export function MainPage({stationModels}: Props) {
    const settings = useSettings();

    return (
        settings ? (
            <div>
                <h3>RoomHelper 3001</h3>
                <Room stationModels={stationModels} rows={settings.rows} columns={settings.columns}/>
                <Footer/>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}
