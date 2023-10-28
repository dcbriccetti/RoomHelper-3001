import StatusTag from "./StatusTag";
import './StatusTags.css'
import {useSettings} from "./contexts";

interface Props {
    visibilities: boolean[]
}

export default function StatusTags({visibilities}: Props) {
    const settings = useSettings();
    if (!settings) return null;

    return (
        <div className='status-tags'>
            {
                settings.statuses.map((status, i) => (
                    <StatusTag key={i} character={visibilities[i] ? status.code : ' '}/>
                ))
            }
        </div>
    );
}
