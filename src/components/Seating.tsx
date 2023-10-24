import React, {useState} from 'react';
import { useSocket } from "../App";

export default function Seating() {
    const [names, setNames] = useState<string>('jones, mary\nsmith, bubba\n');  // state for textarea content
    const socket = useSocket();

    function handleSetNames() {
        const unseatedNames = names.split('\n').filter(name => name.trim() !== '');
        console.log(socket?.id, unseatedNames)
        socket?.emit('set_names', { names: unseatedNames });
    }

    return (
        <div>
            <h1>Seating</h1>
            <p>Enter student names below, one per line.</p>
            <textarea
                id="names"
                rows={8}
                placeholder="Names (Last, First)"
                value={names}
                onChange={e => setNames(e.target.value)}
            ></textarea><br/>
            <button id="set-names" className="btn btn-primary" onClick={handleSetNames}>
                Set
            </button>
        </div>
    );
}
