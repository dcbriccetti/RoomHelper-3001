import {useEffect} from "react";
import socketIOClient, {Socket} from "socket.io-client";
import {SeatedMessage, StationModel} from "./types";

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
            const [lastName, firstName] = name.split(', ');
            const statusValues = [false, false, false]
            updatedStation.student = {firstName, lastName, ip, statusValues};
            updatedStationModels[seatIndex] = updatedStation;
            setStationModels(updatedStationModels);
        }

        function handleStatusSet({seatIndex, key, value}: {seatIndex: number, key: string, value: string}) {
            console.log("Status change:", seatIndex, key, value);
            const updatedStationModels = [...stationModelsRef.current];
            const updatedStation = {...updatedStationModels[seatIndex]}
            if (updatedStation.student) {
                const updatedStudent = {...updatedStation.student}

                let index: number | null = null; // todo support names and emoji from settings
                if (key === "needHelp") {
                    index = 0;
                } else if (key === "haveAnswer") {
                    index = 1;
                } else if (key === "done") {
                    index = 2;
                }

                if (index !== null) {
                    updatedStudent.statusValues[index] = value !== null
                    updatedStationModels[seatIndex] = updatedStation;
                    setStationModels(updatedStationModels);
                }
            }
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

