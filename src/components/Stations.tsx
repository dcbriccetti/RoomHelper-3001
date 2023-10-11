import Station from "./Station";

interface Props {
    tagVisibilities: boolean[]
    numRows: number
    numCols: number
}

export default function Stations({tagVisibilities, numRows, numCols}: Props) {

    function stationName(index: number) {
        const rowFrom0 = Math.floor(index / numCols);
        const colFrom0 = index % numCols;
        return String.fromCharCode('A'.charCodeAt(0) + rowFrom0) + (colFrom0 + 1);
    }

    const style = {
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
    };
    return (
        <div style={style} className='stations'>
            {
                Array.from({length: numRows * numCols}).map((_, i) =>
                    <Station key={i} stationName={stationName(i)} ip={'10.1.1.' + (i + 1)} tagVisibilities={tagVisibilities} studentFirstName={'Dave'} studentLastName={'Briccetti'}/>
                )
            }
        </div>
    );
}
