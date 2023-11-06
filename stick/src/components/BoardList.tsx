import '../styles/BoardList.scss';
import {PartialBoard} from "../types/Board";
import BoardCard from "./BoardCard";

type BoardListProps = {
    boardList: PartialBoard[];
}

export default function BoardList({boardList}: BoardListProps) {
    return (
        <>
            <ul className="boardList">
                {boardList.map(board => <li key={board.id}><BoardCard board={board}/></li>)}
            </ul>

        </>
    )
}
