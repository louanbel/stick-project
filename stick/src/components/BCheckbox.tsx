import '../styles/BButton.scss';
import * as React from "react";
import {useState} from "react";
import {Participant} from "../types/Participant";

type BButtonProps = {
    participant: Participant;
    onUnselectAction: (participant: Participant) => void;
    onSelectAction: (participant: Participant) => void;
}

export default function BCheckbox({participant, onUnselectAction, onSelectAction}: BButtonProps) {

    const [isChecked, setIsChecked] = useState(false);

    function handleOnChange() {
        setIsChecked(!isChecked);
        isChecked ? onUnselectAction(participant) : onSelectAction(participant);
    }

    return (
        <>
            <input type="checkbox" checked={isChecked} onChange={handleOnChange}/>
        </>
    )
}
