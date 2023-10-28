interface Props {
    character: string
}

export default function StatusTag({character}: Props) {
    return (
        <span className='status-tag'>{character}</span>
    )
}
