import './StatusTag.css'
import {Typography} from "@mui/material";

interface Props {
    character: string
}

export default function StatusTag({character}: Props) {
    return (
        <Typography className='status-tag'>{character}</Typography>
    )
}
