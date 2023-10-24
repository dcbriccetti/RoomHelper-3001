interface Props {
    stationName: string
    studentFirstName: string
    studentLastName: string
    ip: string
}

export default function Station({stationName, studentFirstName, studentLastName, ip}: Props) {
    return (
        <div className='station'>
            <div className="station-top-line">
                <span className='station-name left-text'>{stationName}</span>
                <span className='right-text'>{ip}</span>
            </div>
            <div className='station-student-first-name'>{studentFirstName}</div>
            <div className='station-student-last-name'>{studentLastName}</div>
        </div>
    )
}
