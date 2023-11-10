import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Room from "../components/Room";
import TeacherMsg from "./components/TeacherMsg";
import {useSocket} from "../components/contexts";

export default function StudentApp() {
    const HOSTNAME = "http://127.0.0.1:5000";
    const [names, setNames] = useState<string[]>([]);
    const [name, setName] = useState<string | null>(null);
    const [seatIndex, setSeatIndex] = useState<number | null>(null);
    const [teacherMsg, setTeacherMsg] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNames() {
            const response: Response = await fetch(`${HOSTNAME}/students`)
            const names = await response.json() as string[]
            setNames(names)
        }

        fetchNames()
    }, [])

    function handleChange(event: SelectChangeEvent<number>) {
        const index = event.target.value as number;
        setName(names[index])
    }

    const seatingDataCollected = name !== null && seatIndex !== null
    const socket = useSocket()

    useEffect(() => {
        console.log('socket', socket)
        socket?.on('teacher_msg', msg => {
            console.log('received teacher_msg', msg)
          setTeacherMsg(msg.trim());
        });
    }, [socket]);

    return (
        <>
            <Typography variant='h4'>RoomHelper 3001</Typography>
            {! seatingDataCollected &&
                <div>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="student-label">Student</InputLabel>
                        <Select
                            labelId="student-label"
                            id="student"
                            label="Student"
                            onChange={handleChange}
                        >
                            {names.map((studentName, index) => (
                                <MenuItem key={studentName} value={String(index)}>
                                    {studentName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography>Where are you sitting?</Typography>
                    <Room setSeatIndex={setSeatIndex}/>
                </div>
            }
            <TeacherMsg teacherMsg={teacherMsg}/>
        </>
    )
}

/*

<div class="card" id="comm" style="display: none">
    <div class="card-body">
        <h4 class="card-title">Communication</h4>

        <div id="teacher-msg" style="display: none">
            <h5>Instructions from Teacher</h5>
            <p id="teacher-msg-text"></p>
        </div>

        <div id="poll" style="display: none">
            <h5>Question</h5>
            <p id="question-text"></p>
            <div id="poll-multi" class='pollType' style="display: none">
            </div>
            <div id="poll-scale" class='pollType' style="display: none">
                <input type='range' id='scale' min="0" max="10" step="1"> <span id="scale-text"></span>
            </div>
            <div id="poll-text" class='pollType' style="display: none">
                <label for="text-answer">Your Response (Press Enter to submit, Shift+Enter for new lines):</label>
                <textarea class="form-control" id="text-answer"></textarea>
                <span id='answer-received' style='display: none'>Answer received</span>
            </div>
        </div>

        <div id="status-checks" style="display: none">
            <h5 style='margin-top: .5em'>Your Status</h5>
            <span id="statuses"></span>
        </div>
        {% include 'shares.html' %}
        {% include 'chat.html' %}
    </div>
</div>
<p style="font-size: 70%"><a href="https://davebsoft.com">Dave Briccetti Software LLC</a></p>
 */
