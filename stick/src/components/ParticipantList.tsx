import {Participant} from "../types/Participant";
import '../styles/ParticipantList.scss';
import ParticipantItem from "./ParticipantItem";
import BModalC from "./BModal";
import {useEffect, useState} from "react";
import FlipMove from 'react-flip-move';

type ParticipantItemProps = {
    participants: Participant[]
}

export default function ParticipantList({participants}: ParticipantItemProps) {
    const [isParticipantListLoaded, setIsParticipantListLoaded] = useState(false);
    const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
    const [participantList, setParticipantList] = useState(participants);
    useEffect(
        () => {
            if (!isParticipantListLoaded) {
                const fetchData = async () => {
                    try {
                        const response = await fetch('http://127.0.0.1:5000/items', {
                            method: 'GET', // Specify the HTTP method
                        });
                        if (response.ok) {
                            const data: Participant[] = await response.json();
                            console.log(data);
                            setIsParticipantListLoaded(true);
                            setParticipantList(data);
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

    function handleAddParticipantButton() {
        setIsParticipantModalOpen(!isParticipantModalOpen);
    }

    function handleAddModal(participant: Participant) {
        // Save the new participant in database
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

        setIsParticipantModalOpen(false);
    }

    function handleCancelModal() {
        setIsParticipantModalOpen(false);
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


    return (
        <>
            <FlipMove className="participantList">
                {participantList.map((p, i) => (
                    <li key={p.id} className="participantItem">
                        <span
                            className={i == 0 ? "firstPlace" : i == 1 ? "secondPlace" : i == 2 ? "thirdPlace" : ''}>{i + 1}</span>
                        <ParticipantItem participant={p} onUpdate={onParticipantUpdate}/>
                    </li>
                ))}
            </FlipMove>
            <button onClick={handleAddParticipantButton}>Add</button>
            {isParticipantModalOpen && <BModalC className="participantModal" handleAddParticipant={handleAddModal}
                                                handleCancelAction={handleCancelModal}></BModalC>}
        </>
    )
}
