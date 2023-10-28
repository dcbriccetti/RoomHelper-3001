import {useEffect} from "react";
import socketIOClient, {Socket} from "socket.io-client";
import {StationModel} from "./types";
import {handleSeated, handleStatusSet} from "./components/Station";

let HOSTNAME = "http://127.0.0.1:5000";
const ENDPOINT = HOSTNAME + "/teacher";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export default function useSocketDispatcher(
    socketRef: React.MutableRefObject<Socket | null>,
    setErrorDisplay: SetStateFunction<string | null>,
    setStationModels: SetStateFunction<StationModel[] | null>,
    stationModelsRef: React.MutableRefObject<StationModel[]>
) {
    useEffect(() => {
        const s = socketIOClient(ENDPOINT);
        socketRef.current = s;

        s.on('connect_error', (err) => {
            console.error('Connection failed:', err);
            setErrorDisplay('Failed to connect to the server.');
        });

        s.on('disconnect', () => {
            console.log('Disconnected from server');
            setErrorDisplay('Disconnected from the server.');
        });

        s.on('seated', (data) => handleSeated(data, stationModelsRef.current, setStationModels));
        s.on('status_set', (data) => handleStatusSet(data, stationModelsRef.current, setStationModels));

        return () => {
            s.disconnect();
        };
    }, []);  // Empty dependency array ensures this runs only once after initial render
}

