import '../styles/BoardList.scss';
import {PartialBoard} from "../types/Board";
import BoardCard from "./BoardCard";
import {useEffect, useState} from "react";
import {fetchPartialBoardList} from "../helpers/boardHelper";

type BoardListProps = {
    boardList: PartialBoard[];
}

export default function BoardList() {
    const [isBoardListLoaded, setIsBoardListLoaded] = useState(false);
    const [currentBoardList, setCurrentBoardList] = useState([]);


    useEffect(() => {
        if (isBoardListLoaded) {
            return;
        }

        async function fetchData() {
            try {
                const boards = await fetchPartialBoardList();
                setCurrentBoardList(boards);
                setIsBoardListLoaded(true);
            } catch (error) {
                console.error('Error fetching partial boards:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <ul className="boardList">
                {currentBoardList.map(board => <li key={board.id}><BoardCard board={board}/></li>)}
            </ul>
        </>
    )
}
