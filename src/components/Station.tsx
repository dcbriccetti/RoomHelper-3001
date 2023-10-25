import {Student} from "../types";

type Props = {
    stationName: string
    student?: Student
}

export default function Station({stationName, student}: Props) {
    return (
        <div className='station'>
            <div className="station-top-line">
                <span className='station-name left-text'>{stationName}</span>
                <span className='right-text'>{student?.ip || ''}</span>
            </div>
            <div className='station-student-first-name'>{student?.firstName || ''}</div>
            <div className='station-student-last-name'>{student?.lastName || ''}</div>
        </div>
    )
}
