import {Participant} from "../../types/Participant.ts";
import '../../styles/BoardView.scss';
import {useEffect, useRef, useState} from "react";
import {fetchBoard, updateBoard} from "../../helpers/boardHelper.ts";
import {Board} from "../../types/Board.ts";
import {useNavigate, useParams} from 'react-router-dom';
import dayjs from "dayjs";
import FlipMove from "react-flip-move";
import BCheckbox from "../BCheckbox.tsx";
import ParticipantItem from "../ParticipantItem.tsx";
import BButton from "../BButton.tsx";
import AddParticipantModal from "../modals/AddParticipantModal.tsx";
import DeleteParticipantModal from "../modals/DeleteParticipantModal.tsx";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import {IoArrowBackOutline} from "react-icons/io5";
import BHeader from "../BHeader.tsx";
import ParticipantItemSkeleton from "../ParticipantItemSkeleton.tsx";
import {Skeleton} from "@mui/material";
import {isTokenExpired} from "../../helpers/loginHelper.ts";
import ResultModal from "../modals/ResultModal.tsx";

export default function BoardView() {
    const [isBoardLoaded, setIsBoardLoaded] = useState(false);
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
    const [selectedParticipantList, setSelectedParticipantList] = useState<Participant[]>([]);
    const [isDeleteParticipantModalOpen, setIsDeleteParticipantModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpenOpen] = useState(false);
    const [board, setBoard] = useState<Board | null>(null);
    const [isTimesUp, setIsTimesUp] = useState(false);
    const {boardId} = useParams();
    const navigate = useNavigate();
    const [hasBoardUpdated, setHasBoardUpdated] = useState(false);

    const hasFetchedBoard = useRef(false);

    useEffect(() => {
        if (isTokenExpired()) {
            console.log("Token is expired");
            navigate('/login');
            return;
        }

        console.log("boardId", boardId);
        if (boardId != undefined && !hasFetchedBoard.current) {
            console.log("Fetching board");
            fetchBoard(boardId).then((board) => {
                setBoard(board);
                setIsBoardLoaded(true);
                hasFetchedBoard.current = true;
            });
        }
    }, []);

    useEffect(() => {
        if (isBoardLoaded && hasBoardUpdated) {
            updateBoard(board);
        }
    }, [board, isBoardLoaded, hasBoardUpdated]);


    useEffect(() => {
        console.log("selectedParticipantList", selectedParticipantList);
    }, [selectedParticipantList]);

    function handleDeleteParticipantButton() {
        if (selectedParticipantList.length > 0) {
            setIsDeleteParticipantModalOpen(!isDeleteParticipantModalOpen);
        }
    }

    function handleAddParticipantButton() {
        setIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }

    function handleAddParticipantModal(newParticipant: Participant) {
        const newParticipantList = board
            ? [...board.participants, newParticipant].sort((a, b) => b.points - a.points)
            : [newParticipant];

        const updatedBoard = board ? {...board, participants: newParticipantList} : null;

        setBoard(updatedBoard);
        setIsAddParticipantModalOpen(false);
        setHasBoardUpdated(true);
    }

    function handleCancelAddParticipantModal() {
        setIsAddParticipantModalOpen(false);
    }

    function handleCancelDeleteParticipantModal() {
        setIsDeleteParticipantModalOpen(false);
    }

    function handleValidateDeleteParticipantModal() {
        const participantsIdToDelete = selectedParticipantList.map(p => p.id);
        const newParticipantList = board
            ? board.participants.filter((p) => !participantsIdToDelete.includes(p.id))
            : [];
        const updatedBoard = board ? {...board, participants: newParticipantList} : null;
        setBoard(updatedBoard);
        setIsDeleteParticipantModalOpen(false);
        setSelectedParticipantList([]);
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
        setHasBoardUpdated(true);
    }

    function handleSelectParticipant(participant: Participant) {
        if (!selectedParticipantList.includes(participant)) {
            setSelectedParticipantList([...selectedParticipantList, participant]);
        }
    }


    function handleUnselectParticipant(participantToDelete: Participant) {
        const newList = selectedParticipantList.filter(p => p.id !== participantToDelete.id);
        setSelectedParticipantList(newList);
    }


    function handleOnBoardTimesUp() {
        setIsTimesUp(true);
    }

    function handleGoBack() {
        // go back to the previous page using react router
        navigate(-1);
    }

    function handleSeeResult() {
        setIsResultModalOpenOpen(true);
    }

    return (
        <>
            <BHeader/>
            <BButton onClick={handleGoBack}><IoArrowBackOutline/> Go back</BButton>
            <h2>{hasFetchedBoard.current ? board?.name : <Skeleton variant="text"/>}</h2>

            <div className="endTime">
                <div className="endTimeLabel">
                    <p>Time remaining :</p>
                    {!hasFetchedBoard.current && <Skeleton variant="text" width={100}/>}
                    {hasFetchedBoard.current && isTimesUp &&
                        <p className="timesUpLabel"><BButton yellow onClick={handleSeeResult}>See results</BButton></p>}
                </div>
                {hasFetchedBoard.current && <FlipClockCountdown digitBlockStyle={{width: 30, height: 60, fontSize: 30}}
                                                                to={dayjs(board?.endTime).valueOf()}
                                                                onComplete={() => handleOnBoardTimesUp()}/>}
            </div>
            <FlipMove className="participantList">
                {!hasFetchedBoard.current ?
                    <>
                        <li className="participantItem">
                            <ParticipantItemSkeleton/>
                        </li>
                        <li className="participantItem">
                            <ParticipantItemSkeleton/>
                        </li>
                        <li className="participantItem">
                            <ParticipantItemSkeleton/>
                        </li>
                    </> : board?.participants.map((p, i) => (
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
                <BButton first onClick={handleAddParticipantButton}>Add new participant</BButton>
                <BButton disabled={selectedParticipantList.length <= 0} second
                         onClick={handleDeleteParticipantButton}>Delete</BButton>
            </div>

            {
                isAddParticipantModalOpen &&
                <AddParticipantModal className="addParticipantModal"
                                     boardId={board?.id}
                                     handleAddParticipant={handleAddParticipantModal}
                                     handleCancelAction={handleCancelAddParticipantModal}></AddParticipantModal>
            }
            {
                isDeleteParticipantModalOpen &&
                <DeleteParticipantModal participants={selectedParticipantList} className="deleteParticipantModal"
                                        handleValidateAction={handleValidateDeleteParticipantModal}
                                        handleCancelAction={handleCancelDeleteParticipantModal}></DeleteParticipantModal>
            }
            {
                isResultModalOpen &&
                <ResultModal participants={board?.participants || []} className="resultModal"
                             handleValidateAction={() => setIsResultModalOpenOpen(false)}
                             boardName={board?.name || ''}></ResultModal>
            }
        </>
    )
}
