import '../styles/PointListItem.scss';
type PointListItemProps = {
    points: number
}

export default function PointListItem({points}: PointListItemProps) {
    const pointItems = Array.from({length: points}, (v, index) => (
        <li className="point" key={index}></li>
    ));

    return (
        <div className="pointListItem">
            <ul className="list">
                {pointItems}
            </ul>
        </div>
    )
}
