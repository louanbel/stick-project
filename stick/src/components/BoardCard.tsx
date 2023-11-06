import '../styles/BoardCard.scss';
import {PartialBoard} from "../types/Board";
import BButton from "./BButton";
import {IoSearchOutline, IoTrash} from "react-icons/io5";
import {convertTimestampFormat} from "../helpers/dateHelper";

type BoardCardProps = {
    board: PartialBoard;
}

export default function BoardCard({board}: BoardCardProps) {
    console.log(board.endTime);
    return (
        <div className="boardCard">
            <div className="leftCard">
                <h3>{board.name}</h3>
                <p>End time: {convertTimestampFormat(board.endTime)}</p>
                <p>{board.participantCount} participant{board.participantCount > 1 && "s"}</p>
            </div>
            <div className="rightCard">
                <BButton onClick={() => console.log("Access")}><IoSearchOutline /></BButton>
                <BButton red onClick={() => console.log("Access")}><IoTrash /></BButton>
            </div>
        </div>
    )
}
