import '../styles/BModal.scss';
import BButton from "./BButton";
import {Participant} from "../types/Participant";

type DeleteModalProps = {
    participants: Participant[];
    handleCancelAction: () => void;
    handleValidateAction: () => void;
}


export default function DeleteParticipantModal({
                                                   participants,
                                                   handleCancelAction,
                                                   handleValidateAction
                                               }: DeleteModalProps) {

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleValidateAction();
        }
    }


    return (
        <>
            <div className="modalBackground">
            </div>

            <div className="modal">
                <h2>Delete {participants.length} participant{participants.length > 1 && "s"}</h2>
                <div className="nameSection">
                    <p>Are you sure you want to
                        delete {participants.length} participant{participants.length > 1 && "s"}?</p>
                    <p>Participant{participants.length > 1 && "s"} selected :</p>
                    <ul>
                        {participants.map(participant => <li key={participant.id}>{participant.name}</li>)}
                    </ul>
                </div>
                <div className="actions">
                    <BButton second onClick={handleCancelAction}>Cancel</BButton>
                    <BButton first onClick={handleValidateAction} onKeyDown={handleKeyPress}
                    >Delete</BButton>
                </div>
            </div>
        </>
    )
}
