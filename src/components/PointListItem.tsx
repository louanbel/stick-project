import '../styles/PointListItem.scss';

type PointListItemProps = {
    points: number
}

export default function PointListItem({points}: PointListItemProps) {
    const groups = [];
    if (points / 5 > 8) {
        let remaining = points % 5;
        let value = (points - remaining) / 5;
        groups.push(
            <>
                <div className="point-group" key={`group-1`}>
                    <li className="point" key={`point-1`}></li>
                    <li className="point" key={`point-2`}></li>
                    <li className="point" key={`point-3`}></li>
                    <li className="point" key={`point-4`}></li>
                    <li className="point crossed" key={`crossed-5`}></li>
                </div>
                <span>x{value}</span>
            </>
        );
        if (remaining > 0) {
            let remainingSticks = [];
            for (let i = 0; i < remaining; i++) {
                remainingSticks.push(<li className="point" key={`point-${i}`}></li>);
            }
            groups.push(
                <div className="point-group" key={`group-2`}>
                    {remainingSticks}
                </div>
            )
        }
    } else {
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
    }
    return (
        <div className="pointListItem">
            {groups}
        </div>
    );
}
