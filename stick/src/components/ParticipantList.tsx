import {Participant} from "../types/Participant";
import '../styles/ParticipantList.scss';
import {useEffect, useState} from "react";
import FlipMove from 'react-flip-move';
import BButton from "./BButton";
import BCheckbox from "./BCheckbox";
import AddParticipantModal from "./AddParticipantModal";
import DeleteParticipantModal from "./DeleteParticipantModal";
import ParticipantItem from "./ParticipantItem";

type ParticipantItemProps = {
    boardName: string;
    participants: Participant[]
}

export default function ParticipantList({boardName, participants}: ParticipantItemProps) {
    const [isParticipantListLoaded, setIsParticipantListLoaded] = useState(false);
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
    const [selectedParticipantList, setSelectedParticipantList] = useState([]);
    const [isDeleteParticipantModalOpen, setIsDeleteParticipantModalOpen] = useState(false);
    const [participantList, setParticipantList] = useState([]);
    useEffect(
        () => {
            if (!isParticipantListLoaded) {
                const fetchData = async () => {
                    try {
                        const response = await fetch('http://127.0.0.1:5000/items', {
                            method: 'GET',
                        });
                        if (response.ok) {
                            const data: Participant[] = await response.json();
                            console.log("ici");
                            setParticipantList(data);
                            setIsParticipantListLoaded(true);
                        } else {
                            console.error('Failed to fetch JSON data');
                        }
                    } catch (error) {
                        console.error('Error fetching JSON data:', error);
                    }
                };
                fetchData();
            }
        },
        [isParticipantListLoaded]
    );

    useEffect(() => {
        console.log("selectedParticipantList", selectedParticipantList);
    }, [selectedParticipantList]);

    useEffect(() => {
        if (isParticipantListLoaded) {
            const updateData = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:5000/items', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(participantList),
                    });

                    if (response.ok) {
                        console.log('The board was saved successfully : ', response.json());
                    } else {
                        console.error('Failed to save the board data : ', response.json());
                    }
                } catch (error) {
                    console.error('Error while saving board data:', error);
                }
            };
            updateData();
        }
    }, [isParticipantListLoaded, participantList]);

    function handleDeleteParticipantButton() {
        setIsDeleteParticipantModalOpen(!isDeleteParticipantModalOpen);
    }

    function handleAddParticipantButton() {
        setIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }

    function handleAddParticipantModal(participant: Participant) {
        const addData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/items', {
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
        addData();
        const newParticipantList = [...participantList, participant].sort((a, b) => b.points - a.points);
        setParticipantList(newParticipantList);

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
                    const response = await fetch(`http://127.0.0.1:5000/items/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
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

        const newParticipantList = participantList.filter(p => !participantsIdToDelete.includes(p.id));
        setParticipantList(newParticipantList);
        setIsDeleteParticipantModalOpen(false);
    }

    function onParticipantUpdate(updatedParticipant: Participant) {
        const updatedParticipantList = participantList.map((participant: Participant) => {
            if (participant.id == updatedParticipant.id) {
                return updatedParticipant;
            }
            return participant;
        });
        updatedParticipantList.sort((a, b) => b.points - a.points)
        setParticipantList(updatedParticipantList);
    }

    function handleSelectParticipant(participant: Participant) {
        setSelectedParticipantList([...selectedParticipantList, participant]);
    }


    function handleUnselectParticipant(participant: Participant) {
        const removeParticipantIndex: number = selectedParticipantList.findIndex(p => p.id == participant.id);
        const newList = selectedParticipantList.filter(p => p.id !== removeParticipantIndex);
        setSelectedParticipantList(newList);
    }

    return (
        <>
            <h2>{boardName}</h2>
            <FlipMove className="participantList">
                {participantList.map((p, i) => (
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
                <BButton onClick={handleAddParticipantButton}>Add</BButton>
                <BButton onClick={handleDeleteParticipantButton}>Delete</BButton>
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
