import '../../styles/modal/BModal.scss';
import BButton from "../BButton";
import * as React from "react";
import {useEffect} from "react";

type BModalProps = {
    handleFirstAction: () => void;
    handleSecondAction: () => void;
    title: string;
    firstActionLabel: string;
    secondActionLabel?: string;
    children?: React.ReactNode;
}


export default function BModal({handleFirstAction, handleSecondAction, title, firstActionLabel, secondActionLabel, children}: BModalProps) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.scrollTop = 0;
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleFirstAction();
        }
        if (event.key === "Escape") {
            handleSecondAction();
        }
    }

    return (
        <>
            <div className="modalBackground">
            </div>

            <div className="modal">
                <h2>{title}</h2>
                {children}
                <div className="actions" onKeyDown={handleKeyPress}>
                    <BButton second onClick={handleSecondAction} >{secondActionLabel || "Cancel"}</BButton>
                    <BButton first onClick={handleFirstAction}>{firstActionLabel}</BButton>
                </div>
            </div>
        </>
    )
}
