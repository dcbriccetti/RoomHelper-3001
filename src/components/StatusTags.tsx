import StatusTag from "./StatusTag";
import './StatusTags.css'

interface Props {
    visibilities: boolean[]
}

export default function StatusTags({visibilities}: Props) {
    const characters = ['🙋', '💡', '✅ ']; // todo get from settings
    return (
        <div className='status-tags'>
            {
                Array.from({length: 3}).map((_, i) => (
                    <StatusTag key={i} character={visibilities[i] ? characters[i] : ' '} />
                ))
            }
        </div>
    )
}
