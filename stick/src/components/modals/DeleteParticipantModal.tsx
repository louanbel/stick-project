import '../../styles/modals/BModal.scss';
import {Participant} from "../../types/Participant";
import BModal from "./BModal";
import {useState} from "react";
import {deleteParticipants} from "../../helpers/boardHelper.ts";

type DeleteModalProps = {
    className: string;
    participants: Participant[];
    handleCancelAction: () => void;
    handleValidateAction: () => void;
}


export default function DeleteParticipantModal({
                                                   className,
                                                   participants,
                                                   handleCancelAction,
                                                   handleValidateAction
                                               }: DeleteModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    function deleteParticipant() {
        setIsLoading(true);
        const participantIds = participants.map(participant => participant.id);
        deleteParticipants(participantIds).then(() => {
            handleValidateAction();
            setIsLoading(false);
        });
    }

    return (
        <div className={className}>
            <BModal modalType={"small"} handleFirstAction={deleteParticipant} handleSecondAction={handleCancelAction}
                    isLoading={isLoading}
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
        </div>
    )
}
