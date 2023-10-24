import React, {useEffect, useState} from "react";
import {StationModel} from "../StationModel";
import Room from "./Room";
import {useSettings} from "../App";

type Props = {
    hostName: string
}

export function MainPage({hostName}: Props) {
    const [studentNames, setStudentNames] = useState([''])
    const settings = useSettings();

    useEffect(() => {
        fetch(hostName + '/students')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setStudentNames(data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    if (!settings) {
        return <div>Loading...</div>;
    }
    console.log(`rows: ${settings.rows}, cols: ${settings.columns}`)

    const stationData: StationModel[] = studentNames.map((name, i) => {
        const [firstName, lastName] = name.split(' ');
        return ({
            index: i,
            ip: '10.0.0.' + (i + 1),
            firstName: firstName,
            lastName: lastName,
            x: i * 50,
            y: 24 // todo find better way to position these below the Teacher View checkbox
        });
    })

    return (
        <div>
            <div>
                <h3>RoomHelper 3001</h3>
                <Room stationModels={stationData}/>
                <p/>
                <p style={{fontSize: '70%'}}><a href="https://davebsoft.com">Dave Briccetti Software LLC</a></p>
                <br/>
            </div>
        </div>
    );
}
