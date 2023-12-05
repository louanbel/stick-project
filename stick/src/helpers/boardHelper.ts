import {Board, PartialBoard} from "../types/Board";

export async function fetchPartialBoardList(): Promise<PartialBoard[]> {
    try {
        const response = await fetch('http://127.0.0.1:5000/partialBoards', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch JSON data');
        }

        const data: PartialBoard[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching participant list:', error);
        return error;
    }
}

export async function fetchBoard(boardId: number): Promise<Board> {
    try {
        const response = await fetch(`http://127.0.0.1:5000/boards/${boardId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch JSON data');
        }

        const data: Board = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching participant list:', error);
        return error;
    }

}
