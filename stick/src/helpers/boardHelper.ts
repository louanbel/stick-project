import {Board, PartialBoard} from "../types/Board";
import axios from "axios";
import {Participant} from "../types/Participant.ts";
import {AvatarSettings, AvatarSettingsProps, defaultAvatarSettings} from "./avatarHelper.ts";


export async function updateBoard(board?: Board | null) {
    try {
        if (!board) {
            console.error("Trying to save an undefined board");
            return;
        }

        const response = await axios.put(`http://127.0.0.1:5000/board/update-participants/${board.id}`,
            JSON.stringify(board.participants),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        );

        if (response.status == 200) {
            console.log('The board was saved successfully : ', response.data);
        } else {
            console.error('Failed to save the board data : ', response.data);
        }
    } catch
        (error) {
        console.error('Error while saving board data:', error);
    }
}

export async function deleteParticipants(participantsIds: number[]): Promise<void> {
    participantsIds.map(deleteParticipant);
}

export async function deleteParticipant(participantId: number): Promise<void> {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/board/delete-participant/${participantId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

        if (response.status == 200) {
            console.log(`The participant with id ${participantId} was deleted successfully :`, response.data);
        } else {
            console.error(`Failed to delete the participant with id ${participantId} : `, response.data);
        }
    } catch (error) {
        console.error(`Error while deleting the participant with id ${participantId} :`, error);
    }

}

export async function addParticipant(participant: Participant, boardId?: number): Promise<number> {
    if (boardId === undefined) {
        console.error("Trying to add a participant with an undefined boardId");
        throw new Error("BoardId is undefined boardId");
    }

    try {
        const response = await axios.post(`http://127.0.0.1:5000/board/add-participant/${boardId}`, JSON.stringify(participant), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status == 200) {
            console.log(`The participant ${participant} was saved successfully :`, response.data);
            return response.data.id;
        } else {
            console.error(`Failed to save the new participant ${participant} : `, response.data);
            throw new Error(`Failed to save the new participant ${participant} : ${response.data}`);
        }
    } catch (error) {
        console.error(`Error while add the participant ${participant} board data:`, error);
        throw error;
    }
}

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

        const participants: Participant[] = response.data.participants.map((participant: any) => {
            const avatarSettings = participant.avatarSettings ?
                new AvatarSettings(participant.avatarSettings as AvatarSettingsProps) :
                new AvatarSettings(defaultAvatarSettings);
            return new Participant(participant.name, participant.points, avatarSettings, participant.id);
        });

        return {
            ...response.data,
            participants
        } as Board;

    } catch (error: any) {
        console.error('Error fetching participant list:', error);
        throw error;
    }

}
