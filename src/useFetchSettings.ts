import {useState, useEffect} from 'react';
import {Settings, StationModel, UseFetchSettingsReturnType} from './types';

const HOSTNAME = "http://127.0.0.1:5000";

function useFetchSettings(): UseFetchSettingsReturnType {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [stationModels, setStationModels] = useState<StationModel[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(HOSTNAME + '/settings')
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const transformedStatuses = data.statuses.map(
                    (status: [string, string, string]) => ({
                        key: status[0],
                        code: status[1],
                        text: status[2]
                    }));

                const s: Settings = {
                    ...data,
                    statuses: transformedStatuses
                } as Settings;

                setSettings(s);

                const models = Array.from({length: s.rows * s.columns}).map((_, i) => ({
                    index: i,
                    row: Math.floor(i / s.columns),
                    column: i % s.columns,
                    ip: '',
                    firstName: '',
                    lastName: '',
                }));
                setStationModels(models);
            })
            .catch((err) => setError(err.message));
    }, []);

    return {settings, stationModels, setStationModels, error};
}

export default useFetchSettings;
