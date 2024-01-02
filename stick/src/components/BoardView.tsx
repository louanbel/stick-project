import {Participant} from "../types/Participant";
import '../styles/BoardView.scss';
import {useEffect, useState} from "react";
import {fetchBoard} from "../helpers/boardHelper";
import {Board} from "../types/Board";
import {useNavigate, useParams} from 'react-router-dom';
import dayjs from "dayjs";
import FlipMove from "react-flip-move";
import BCheckbox from "./BCheckbox";
import ParticipantItem from "./ParticipantItem";
import BButton from "./BButton";
import AddParticipantModal from "./modal/AddParticipantModal";
import DeleteParticipantModal from "./modal/DeleteParticipantModal";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import {IoArrowBackOutline} from "react-icons/io5";
import axios from "axios";

export default function BoardView() {
    const [isBoardLoaded, setIsBoardLoaded] = useState(false);
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
    const [selectedParticipantList, setSelectedParticipantList] = useState<Participant[]>([]);
    const [isDeleteParticipantModalOpen, setIsDeleteParticipantModalOpen] = useState(false);
    const [board, setBoard] = useState<Board | null>(null);
    const [isTimesUp, setIsTimesUp] = useState(false);
    const {boardId} = useParams();
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!isBoardLoaded && boardId != undefined) {
                console.log("fetching board");
                fetchBoard(boardId).then((board) => {
                    setBoard(board);
                    setIsBoardLoaded(true);
                });
            }
        },
        []
    );

    useEffect(() => {
        console.log("selectedParticipantList", selectedParticipantList);
    }, [selectedParticipantList]);

    useEffect(() => {
            if (isBoardLoaded) {
                const updateData = async () => {
                        try {
                            const response = await axios.put(`http://127.0.0.1:5000/board/update-participants/${board?.id}`,
                                JSON.stringify(board?.participants),
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
                ;
                updateData();
            }
        }
        ,
        [isBoardLoaded, board]
    )
    ;

    function handleDeleteParticipantButton() {
        if (selectedParticipantList.length > 0) {
            setIsDeleteParticipantModalOpen(!isDeleteParticipantModalOpen);
        }
    }

    function handleAddParticipantButton() {
        setIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }

    function handleAddParticipantModal(participant: Participant) {
        const addParticipant = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/board/add-participant/${board?.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(participant),
                });

                if (response.ok) {
                    console.log(`The participant ${participant} was saved successfully :`, response.json());
                } else {
                    console.error(`Failed to save the new participant ${participant} : `, response.json());
                }
            } catch (error) {
                console.error(`Error while add the participant ${participant} board data:`, error);
            }
        };
        addParticipant();
        const newParticipantList = board
            ? [...board.participants, participant].sort((a, b) => b.points - a.points)
            : [participant];

        const updatedBoard = board ? {...board, participants: newParticipantList} : null;

        setBoard(updatedBoard);
        setIsAddParticipantModalOpen(false);
    }

    function handleCancelAddParticipantModal() {
        setIsAddParticipantModalOpen(false);
    }

    function handleCancelDeleteParticipantModal() {
        setIsDeleteParticipantModalOpen(false);
    }

    function handleValidateDeleteParticipantModal() {
        const participantsIdToDelete = selectedParticipantList.map(p => p.id);
        participantsIdToDelete.map(id => {
            const deleteData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/board/delete-participant/${board?.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: id})
                    });

                    if (response.ok) {
                        console.log(`The participant with id ${id} was deleted successfully :`, response.json());
                    } else {
                        console.error(`Failed to delete the participant with id ${id} : `, response.json());
                    }
                } catch (error) {
                    console.error(`Error while deleting the participant with id ${id} :`, error);
                }
            };
            deleteData();
        });

        const newParticipantList = board
            ? board.participants.filter((p) => !participantsIdToDelete.includes(p.id))
            : [];
        const updatedBoard = board ? {...board, participants: newParticipantList} : null;
        setBoard(updatedBoard);
        setIsDeleteParticipantModalOpen(false);
    }

    function onParticipantUpdate(updatedParticipant: Participant) {
        const updatedParticipantList = board
            ? board.participants.map((participant: Participant) => {
                if (participant.id === updatedParticipant.id) {
                    return updatedParticipant;
                }
                return participant;
            })
            : [];

        const sortedParticipantList = updatedParticipantList
            ? [...updatedParticipantList].sort((a, b) => b.points - a.points)
            : [];

        const updatedBoard = board ? {...board, participants: sortedParticipantList} : null;

        setBoard(updatedBoard);
    }

    function handleSelectParticipant(participant: Participant) {
        setSelectedParticipantList([...selectedParticipantList, participant]);
    }


    function handleUnselectParticipant(participant: Participant) {
        const removeParticipantIndex: number = selectedParticipantList.findIndex(p => p.id == participant.id);
        const newList = selectedParticipantList.filter(p => p.id !== removeParticipantIndex);
        setSelectedParticipantList(newList);
    }


    function handleOnBoardTimesUp() {
        setIsTimesUp(true);
    }

    return (
        <>
            <h2>{board?.name}</h2>
            {board &&
            <div className="endTime">
                <div className="endTimeLabel">
                    <p>Time remaining :</p>
                    {isTimesUp && <p className="timesUpLabel">Time is up !</p>}
                </div>
                <FlipClockCountdown to={dayjs(board?.endTime).valueOf()} onComplete={() => handleOnBoardTimesUp()}/>
            </div>}
            <FlipMove className="participantList">
                {board?.participants.map((p, i) => (
                    <li key={p.id} className="participantItem">
                        <BCheckbox
                            id={"checkbox-" + p.id} participant={p}
                            onUnselectAction={() => handleUnselectParticipant(p)}
                            onSelectAction={() => handleSelectParticipant(p)}/>
                        <span
                            className={`position ${i == 0 ? "firstPlace" : i == 1 ? "secondPlace" : i == 2 ? "thirdPlace" : ''}`}>{i + 1}
                </span>
                        <ParticipantItem participant={p} onUpdate={onParticipantUpdate}/>
                    </li>
                ))}
            </FlipMove>
            <div className={"boardActions"}>
                <BButton first onClick={handleAddParticipantButton}>Add</BButton>
                <BButton second onClick={handleDeleteParticipantButton}>Delete</BButton>
            </div>

            {isAddParticipantModalOpen &&
                <AddParticipantModal className="addParticipantModal" handleAddParticipant={handleAddParticipantModal}
                                     handleCancelAction={handleCancelAddParticipantModal}></AddParticipantModal>}
            {isDeleteParticipantModalOpen &&
                <DeleteParticipantModal participants={selectedParticipantList} className="deleteParticipantModal"
                                        handleValidateAction={handleValidateDeleteParticipantModal}
                                        handleCancelAction={handleCancelDeleteParticipantModal}></DeleteParticipantModal>}
        </>
    )
}
