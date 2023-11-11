import {Accordion, AccordionDetails, AccordionSummary, MenuItem, Select, Typography} from "@mui/material";
import Room from "../../components/Room";
import {useSocket} from "../../components/contexts";
import {useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
    names: string[];
    studentIndex: number | null;
    setStudentIndex: (studentIndex: number) => void;
    setSeatIndex: (seatIndex: number) => void;
}

export default function StudentSeat({names, studentIndex, setStudentIndex, setSeatIndex}: Props) {
    const [expanded, setExpanded] = useState(true);
    const socket = useSocket();

    function seatStudent(seatIndex: number) {
        console.log("setting seat index to", seatIndex);
        socket?.emit('seat', {
            nameIndex: studentIndex,
            seatIndex: seatIndex
        }, (response: string) => {
            console.log("seat response", response);
            if (response === 'OK') {
                // todo audioContext.resume();
            } else console.log(response);
        });
        setExpanded(false);
        setSeatIndex(seatIndex);
    }

    return (
        <div style={{display: 'inline-block'}}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant={"h6"}>Student and Seat</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Student</Typography>
                    <div>
                        <Select
                            labelId="student-label"
                            id="student"
                            value={names.length > 0 ? studentIndex ?? 0 : ''}
                            label="Student"
                            onChange={(event) => setStudentIndex(Number(event.target.value))}
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
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
