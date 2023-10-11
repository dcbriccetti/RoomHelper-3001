import StatusTags from "./StatusTags";

interface Props {
    stationName: string
    studentFirstName: string
    studentLastName: string
    ip: string
    tagVisibilities: boolean[]
}

export default function Station({stationName, studentFirstName, studentLastName, ip, tagVisibilities}: Props) {
    return (
        <div className='station'>
            <div className="station-top-line">
                <span className='station-name left-text'>{stationName}</span>
                <span className='right-text'>{ip}</span>
            </div>
            <div className='station-student-first-name'>{studentFirstName}</div>
            <div className='station-student-last-name'>{studentLastName}</div>
            <StatusTags visibilities={tagVisibilities}/>
        </div>
    )
}
