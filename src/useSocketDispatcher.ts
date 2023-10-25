import {useEffect} from "react";
import socketIOClient, {Socket} from "socket.io-client";
import {SeatedMessage, StationModel, StatusSetMessage} from "./types";

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
        function handleSeated({seatIndex, name, ip}: SeatedMessage) {
            console.log("Seated:", seatIndex, name, ip);

            const updatedStationModels = [...stationModelsRef.current];
            const updatedStation = {...updatedStationModels[seatIndex]}
            const [firstName, lastName] = name.split(', ');
            updatedStation.student = {firstName, lastName, ip};
            updatedStationModels[seatIndex] = updatedStation;
            setStationModels(updatedStationModels);
        }

        function handleStatusSet({seatIndex, key, value}: StatusSetMessage) {
            console.log("Status change:", seatIndex, key, value);
        }

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

        s.on('seated', handleSeated);
        s.on('status_set', handleStatusSet);

        return () => {
            s.disconnect();
        };
    }, []);  // Empty dependency array ensures this runs only once after initial render
}

