interface Props {
    character: string
    backgroundColor: string
    isVisible: boolean
}

export default function StatusTag({character, backgroundColor, isVisible}: Props) {
    return isVisible ? (
        <span style={{backgroundColor: backgroundColor}} className='status-tag'>{character}</span>
    ) : null
}
