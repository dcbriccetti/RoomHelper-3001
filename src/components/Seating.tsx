import React, {useEffect, useState} from 'react';
import { useSocket } from "../App";

export default function Seating() {
    const [names, setNames] = useState<string>('');  // state for textarea content
    const socket = useSocket();

    useEffect(() => {
        socket?.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });
        socket?.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket?.off('connect');
            socket?.off('disconnect');
        };
    }, [socket]);

    function handleSetNames() {
        const unseatedNames = names.split('\n').filter(name => name.trim() !== '');
        console.log(socket?.id, unseatedNames)
        socket?.emit('set_names', { names: unseatedNames });
    }

    return (
        <div className="container">
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
