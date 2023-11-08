import StatusTag from "./StatusTag";
import './StatusTags.css'
import {useSettings} from "./contexts";
import {Box} from "@mui/material";

interface Props {
    visibilities: boolean[]
}

export default function StatusTags({visibilities}: Props) {
    const settings = useSettings();
    if (!settings) return null;

    return (
        <Box component='span' className='status-tags'>
            {
                settings.statuses.map((status, i) => (
                    <StatusTag key={i} character={visibilities[i] ? status.code : ' '}/>
                ))
            }
        </Box>
    );
}
