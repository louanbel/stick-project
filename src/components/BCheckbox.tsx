import '../styles/BButton.scss';
import {useState} from "react";
import {Participant} from "../types/Participant";

type BButtonProps = {
    id: string;
    participant: Participant;
    onUnselectAction: (participant: Participant) => void;
    onSelectAction: (participant: Participant) => void;
}

export default function BCheckbox({id, participant, onUnselectAction, onSelectAction}: BButtonProps) {

    const [isChecked, setIsChecked] = useState(false);

    function handleOnChange() {
        setIsChecked(!isChecked);
        isChecked ? onUnselectAction(participant) : onSelectAction(participant);
    }

    return (
        <div id={id}>
            <input type="checkbox" checked={isChecked} onChange={handleOnChange}/>
        </div>
    )
}
