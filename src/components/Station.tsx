interface Props {
    stationName: string
    x: number
    y: number
    studentFirstName: string
    studentLastName: string
    ip: string
}

export default function Station({stationName, x, y, studentFirstName, studentLastName, ip}: Props) {

    function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
        const {left, top} = e.currentTarget.getBoundingClientRect()
        const dragData = {
            stationName: stationName,
            offsetX: e.clientX - left,
            offsetY: e.clientY - top
        };

        e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
        e.currentTarget.style.cursor = 'grabbing';
    }

    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.cursor = 'grab';
    }

    const style = {
        left: `${x}px`,
        top: `${y}px`
    }

    return (
        <div className='station' style={style} draggable={true}
             onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="station-top-line">
                <span className='station-name left-text'>{stationName}</span>
                <span className='right-text'>{ip}</span>
            </div>
            <div className='station-student-first-name'>{studentFirstName}</div>
            <div className='station-student-last-name'>{studentLastName}</div>
        </div>
    )
}
