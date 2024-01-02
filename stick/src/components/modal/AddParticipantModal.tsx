import '../../styles/modal/BModal.scss';
import {Participant} from "../../types/Participant";
import {useState} from "react";
import BModal from "./BModal";

type BModalProps = {
    className: string;
    handleCancelAction: () => void;
    handleAddParticipant: (participant: Participant) => void;
}


export default function AddParticipantModal({className, handleCancelAction, handleAddParticipant}: BModalProps) {
    const [nameInput, setNameInput] = useState("");
    const [isError, setIsError] = useState(false);

    function handleAddAction(): void {
        if (nameInput.length == 0) {
            setIsError(true);
            return;
        }
        const newParticipant: Participant = new Participant(nameInput);
        handleAddParticipant(newParticipant);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleAddAction();
        }
    }

    function handleOnInputChange(value: string) {
        setNameInput(value);
        if (value.length > 0) {
            setIsError(false);
        }
    }


    return (
        <div className={className}>
            <BModal handleFirstAction={handleAddAction} handleSecondAction={handleCancelAction}
                    title={"Add a participant"}
                    firstActionLabel={"Add"}>
                <div className="section nameSection">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text"
                           className="formInput"
                           id="nameInput"
                           placeholder="Enter participant's name"
                           onChange={(e) => handleOnInputChange(e.target.value)}
                           onKeyDown={handleKeyPress}
                    />
                    {isError && <span className="inputError">Name cannot be empty !</span>}
                </div>
            </BModal>
        </div>
    )
}
