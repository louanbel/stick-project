import '../styles/BButton.scss';
import {useEffect, useState} from "react";
import {Participant} from "../types/Participant";

type BButtonProps = {
    id: string;
    participant: Participant;
    onUnselectAction: (participant: Participant) => void;
    onSelectAction: (participant: Participant) => void;
    checked: boolean;
}

export default function BCheckbox({id, participant, onUnselectAction, onSelectAction, checked}: BButtonProps) {

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

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
