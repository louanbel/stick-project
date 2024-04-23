import '../../styles/modal/BModal.scss';
import '../../styles/modal/ImportParticipantModal.scss';
import {Participant} from "../../types/Participant";
import {useEffect, useState} from "react";
import BModal from "./BModal";
import {fetchAllParticipantOfAUser} from "../../helpers/boardHelper.ts";
import {generateAvatarFromSettings} from "../../helpers/avatarHelper.ts";


type BModalProps = {
    className: string;
    handleCancelAction: () => void;
    handleImportParticipant: (participant: Participant) => void;
    boardId?: number;
}


export default function ImportParticipantModal({
                                                   className,
                                                   handleCancelAction,
                                                   handleImportParticipant,
                                                   boardId,
                                               }: BModalProps) {
    const [participantList, setParticipantList] = useState<Participant[]>([]);
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (boardId !== undefined) {
            fetchAllParticipantOfAUser(boardId).then((participants) => {
                    setParticipantList(participants);
                    setIsLoading(false);
                }
            );
        }
    }, []);

    function handleValidateAction() {
        setIsLoading(true);
        if (selectedParticipant) {
            handleImportParticipant(selectedParticipant);
            setIsLoading(false);
        }
    }

    return (

        <div className={className}>
            <BModal width={60} height={60} handleFirstAction={handleValidateAction}
                    handleSecondAction={handleCancelAction}
                    title={"Import an existing participant"}
                    firstActionLabel={"Add"}
                    isFirstActionDisabled={selectedParticipant === null}
                    isLoading={isLoading}
            >
                <div className={"importedParticipants"}>
                    {boardId === undefined ? <div>Something wrong happened. Please go back to the home page.</div> :
                        participantList.map((p) =>
                            <div key={p.id}
                                 className={`participantItem ${selectedParticipant?.id === p.id ? 'selected' : ''}`}
                                 onClick={() => setSelectedParticipant(p)}>
                                <img src={generateAvatarFromSettings(p.avatar.settings)} className={"avatar"}
                                     alt="avatar"/>
                                <span className={"name"}>{p.name}</span>
                            </div>
                        )
                    }
                </div>
            </BModal>
        </div>
    )
}
