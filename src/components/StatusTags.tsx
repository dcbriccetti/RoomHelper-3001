import StatusTag from "./StatusTag";

interface Props {
    visibilities: boolean[]
}

export default function StatusTags({visibilities}: Props) {
    const backgroundColors = ['darkred', 'darkgreen', 'darkblue'];
    const characters = ['?', 'A', 'D'];
    return (
        <div className='status-tags'>
            {
                Array.from({length: 3}).map((_, i) => (
                    <StatusTag key={i} character={characters[i]} backgroundColor={backgroundColors[i]}
                               isVisible={visibilities[i]}/>
                ))
            }
        </div>
    )
}
