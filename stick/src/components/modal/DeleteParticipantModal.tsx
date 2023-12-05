import '../../styles/modal/BModal.scss';
import {Participant} from "../../types/Participant";
import BModal from "./BModal";

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

    return (
        <>
            <BModal handleFirstAction={handleValidateAction} handleSecondAction={handleCancelAction}
                    title={`Delete ${participants.length} participant${participants.length > 1 ? "s" : ''}`}
                    firstActionLabel={"Delete"}>
                <div className="nameSection">
                    <p>Are you sure you want to
                        delete {participants.length} participant{participants.length > 1 && "s"}?</p>
                    <p>Participant{participants.length > 1 && "s"} selected :</p>
                    <ul>
                        {participants.map(participant => <li key={participant.id}>{participant.name}</li>)}
                    </ul>
                </div>
            </BModal>
        </>
    )
}
