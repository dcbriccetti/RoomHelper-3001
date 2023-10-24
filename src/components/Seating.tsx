import React, {useState} from 'react';
import { useSocket } from "../App";

export default function Seating() {
    const [names, setNames] = useState<string>('jones, mary\nsmith, bubba\n');  // todo remove default names
    const socket = useSocket();
    if (!socket) {
        throw new Error("Socket is null or undefined");
    }

    function handleSetNames() {
        const unseatedNames = names.split('\n').filter(name => name.trim() !== '');
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
