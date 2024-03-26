import '../../styles/modals/BModal.scss';
import BButton from "../BButton";
import * as React from "react";
import {useEffect} from "react";

type BModalProps = {
    handleFirstAction: () => void;
    handleSecondAction: () => void;
    modalType?: "small" | "medium" | "large";
    width?: number;
    height?: number;
    title: string;
    firstActionLabel: string;
    secondActionLabel?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
}


export default function BModal({
                                   handleFirstAction,
                                   handleSecondAction,
                                   modalType,
                                   title,
                                   firstActionLabel,
                                   secondActionLabel,
                                   children,
                                   isLoading
                               }: BModalProps) {


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

            <div className={`modal ${modalType}`}>
                <h2>{title}</h2>
                {children}
                <div className="actions" onKeyDown={handleKeyPress}>
                    <BButton disabled={isLoading} second
                             onClick={handleSecondAction}>{secondActionLabel || "Cancel"}</BButton>
                    <BButton first
                             isLoading={isLoading}
                             onClick={handleFirstAction}>{firstActionLabel}
                    </BButton>
                </div>
            </div>
        </>
    )
}
