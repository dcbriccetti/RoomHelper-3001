import StatusTags from "./StatusTags";

interface Props {
    stationName: string
    ip: string
    tagVisibilities: boolean[]
}

export default function Station({stationName, ip, tagVisibilities}: Props) {
    return (
        <div className='station'>
            <span className='station-name'>{stationName}</span><br/>
            <p>{ip}</p>
            <StatusTags visibilities={tagVisibilities}/>
        </div>
    )
}
