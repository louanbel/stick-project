import '../styles/PointListItem.scss';

type PointListItemProps = {
    points: number
}

export default function PointListItem({ points }: PointListItemProps) {
    const groups = [];
    for (let i = 0; i < points; i += 5) {
        const group = [];
        for (let j = 0; j < 4; j++) {
            if (i + j < points) {
                group.push(<li className="point" key={`point-${i + j}`}></li>);
            }
        }
        if (i + 4 < points) {
            group.push(<li className="point crossed" key={`crossed-${i}`}></li>);
        }
        groups.push(
            <div className="point-group" key={`group-${i}`}>
                {group}
            </div>
        );
    }

    return (
        <div className="pointListItem">
            {groups}
        </div>
    );
}
