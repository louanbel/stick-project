import '../styles/BoardList.scss';
import {Board, PartialBoard} from "../types/Board";
import BoardCard from "./BoardCard";
import {useEffect, useState} from "react";
import {fetchPartialBoardList} from "../helpers/boardHelper";
import BButton from "./BButton";
import CreateBoardModal from "./modal/CreateBoardModal";
import DeleteBoardModal from "./modal/DeleteBoardModal";

type BoardListProps = {
    boardList: PartialBoard[];
}

export default function BoardList() {
    const [isBoardListLoaded, setIsBoardListLoaded] = useState(false);
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
    const [boardList, setBoardList] = useState([]);
    const [currentBoardSelected, setCurrentBoardSelected] = useState<PartialBoard>(null);
    const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);


    useEffect(() => {
        if (isBoardListLoaded) {
            return;
        }

        async function fetchData() {
            try {
                const boards = await fetchPartialBoardList();
                setBoardList(boards);
                setIsBoardListLoaded(true);
            } catch (error) {
                console.error('Error fetching partial boards:', error);
            }
        }

        fetchData();
    }, []);

    function handleCreateNewBoard() {
        setIsCreateBoardModalOpen(true);
    }

    function handleCreateBoardModal(result: Board) {
        console.log(result);
        setBoardList([...boardList, new PartialBoard(result.id, result.name, result.endTime, 0)]);
        setIsCreateBoardModalOpen(false);
    }

    function handleCancelCreateBoardModal() {
        setIsCreateBoardModalOpen(false);
    }

    function handleDeleteBoard(board: PartialBoard) {
        setCurrentBoardSelected(board);
        setIsDeleteBoardModalOpen(true);
    }

    function handleDeleteBoardModal() {
        const newBoardList = boardList.filter(board => board.id !== currentBoardSelected.id);
        setBoardList(newBoardList);
        setCurrentBoardSelected(null);
        setIsDeleteBoardModalOpen(false);
    }

    return (
        <>
            <h2>My boards</h2>
            <ul className="boardList">
                {boardList.map(board => <li key={board.id}><BoardCard board={board} handleDeleteBoardAction={() => handleDeleteBoard(board)}/></li>)}
            </ul>
            <div className={"actions"}>
                <BButton first onClick={handleCreateNewBoard}>Create</BButton>
                <BButton second onClick={() => {}}>Delete</BButton>
            </div>
            {isCreateBoardModalOpen &&
                <CreateBoardModal className="addParticipantModal" handleCreateBoard={handleCreateBoardModal}
                                     handleCancelAction={handleCancelCreateBoardModal}></CreateBoardModal>}
            {isDeleteBoardModalOpen && <DeleteBoardModal board={currentBoardSelected} handleCancelAction={() => setIsDeleteBoardModalOpen(false)} handleValidateAction={handleDeleteBoardModal}/>}

        </>
    )
}
