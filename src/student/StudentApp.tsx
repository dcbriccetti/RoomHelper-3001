import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Room from "../components/Room";
import TeacherMsg from "./components/TeacherMsg";
import {useSocket} from "../components/contexts";
import Poll from "./components/Poll";

export default function StudentApp() {
    const HOSTNAME = "http://127.0.0.1:5000";
    const [names, setNames] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [studentIndex, setStudentIndex] = useState<number | null>(null);
    const [seatIndex, setSeatIndex] = useState<number | null>(null);
    const [teacherMsg, setTeacherMsg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNames() {
            try {
                const response = await fetch(`${HOSTNAME}/students`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const names = await response.json();
                setNames(names);
                if (names.length > 0) {
                    setName(names[0]);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error("Fetching error:", error);
            }
        }

        fetchNames();
    }, []);

    function handleChange(event: SelectChangeEvent<number>) {
        const selectedIndex = Number(event.target.value);
        setStudentIndex(selectedIndex);
        setName(names[selectedIndex]);
    }

    const seatingDataCollected = name !== '' && seatIndex !== null;
    const socket = useSocket();

    useEffect(() => {
        console.log('socket', socket);
        socket?.on('teacher_msg', msg => {
            console.log('received teacher_msg', msg);
            setTeacherMsg(msg.trim());
        });
        return () => {
            socket?.off('teacher_msg');
        }
    }, [socket]);

    function seatStudent(seatIndex: number) {
        socket?.emit('seat', {
            nameIndex: studentIndex,
            seatIndex: seatIndex
        }, (response: string) => {
            if (response === 'OK') {
                // todo audioContext.resume();
            } else console.log(response);
        });
        setSeatIndex(seatIndex);
    }

    const nameInTitle = name !== '' ? `—${name}` : '';

    return (
        <>
            {error && <div>Error loading data: {error}</div>}
            <Typography variant='h4'>RoomHelper 3001{nameInTitle}</Typography>
            {!seatingDataCollected &&
                <div>
                    <div>
                        <Typography>Student</Typography>
                        <Select
                            labelId="student-label"
                            id="student"
                            value={names.length > 0 ? studentIndex ?? 0 : ''}
                            label="Student"
                            onChange={handleChange}
                        >
                            {names.map((studentName, i) => (
                                <MenuItem key={studentName} value={i}>
                                    {studentName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Typography>Seat</Typography>
                    <Room seatStudent={seatStudent}/>
                </div>
            }
            <TeacherMsg teacherMsg={teacherMsg}/>
            <Poll/>
        </>
    )
}
/*

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
