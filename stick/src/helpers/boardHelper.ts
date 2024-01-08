import {Board, PartialBoard} from "../types/Board";
import axios from "axios";

export async function fetchPartialBoardList(): Promise<PartialBoard[]> {
    try {
        const response = await axios.get("http://127.0.0.1:5000/partialBoards", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },

            }
        );


        if (response.status != 200) {
            throw new Error('Failed to fetch JSON data');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching participant list:', error);
        throw error;
    }
}

export async function fetchBoard(boardId: string): Promise<Board> {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/boards/${boardId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (response.status != 200) {
            throw new Error('Failed to fetch JSON data');
        }

        const data: Board = response.data;
        return data;
    } catch (error: any) {
        console.error('Error fetching participant list:', error);
        throw error;
    }

}
