import {Participant} from "../types/Participant";
import {useEffect, useState} from "react";
import '../styles/PointListItem.scss';
type PointListItemProps = {
    points: number
}

export default function PointListItem({points}: PointListItemProps) {
    const pointItems = Array.from({length: points}, (v, index) => (
        <li key={index}></li>
    ));

    return (
        <div className="pointListItem">
            <ul className="list">
                {pointItems}
            </ul>
        </div>
    )
}
