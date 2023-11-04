import React, {useState} from 'react';
import {useSocket} from "./contexts";
import {Button, Stack, TextField} from "@mui/material";

export default function Seating() {
    const [names, setNames] = useState<string>('Jones, Mary\nSmith, Bubba\n');  // todo remove default names
    const socket = useSocket();

    function handleSetNames() {
        const unseatedNames = names.split('\n').filter(name => name.trim() !== '');
        socket?.emit('set_names', {names: unseatedNames});
    }

    return (
        <Stack width="20em" alignContent='left'>
            <p>Enter student names below, one per line.</p>
            <TextField
                sx={{marginBottom: '10px'}}
                id="names"
                label="Names (Last, First)"
                multiline
                minRows={8}
                value={names}
                onChange={e => setNames(e.target.value)}
            />
            <Button id="set-names" variant='contained' sx={{ width: 'fit-content' }} onClick={handleSetNames}>
                Set
            </Button>
        </Stack>
    );
}
