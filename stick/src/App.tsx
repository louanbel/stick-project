import './App.css'
import {useEffect, useState} from "react";
import {fetchPartialBoardList} from "./helpers/boardHelper";
import BoardList from "./components/BoardList";

function App() {
    const [isBoardListLoaded, setIsBoardListLoaded] = useState(false);
    const [boardList, setBoardList] = useState([]);

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

    return (
        <>
            <BoardList boardList={boardList}/>
        </>
    )
}

export default App
