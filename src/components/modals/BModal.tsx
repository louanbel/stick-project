import '../../styles/modal/BModal.scss';
import BButton from "../BButton";
import * as React from "react";
import {useEffect, useRef} from "react";

type BModalProps = {
    handleFirstAction: () => void;
    handleSecondAction: () => void;
    width?: number;
    height?: number;
    title: string;
    firstActionLabel: string;
    secondActionLabel?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
    isFirstActionDisabled?: boolean;
}


export default function BModal({
                                   handleFirstAction,
                                   handleSecondAction,
                                   width,
                                   height,
                                   title,
                                   firstActionLabel,
                                   secondActionLabel,
                                   children,
                                   isLoading,
                                   isFirstActionDisabled
                               }: BModalProps) {

    let modalStyle = {
        ...(width && {
            width: `${width}%`
        }),
        ...(height && {
            height: `${height}%`
        }),
    };

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();

            document.body.style.overflow = 'hidden';
            document.documentElement.scrollTop = 0;
            return () => {
                document.body.style.overflow = 'visible';
            };
        }
    }, []);

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            handleFirstAction();
        }
        if (event.key === "Escape") {
            handleSecondAction();
        }
    }

    return (
        <div onKeyDown={handleKeyPress} ref={modalRef} tabIndex={0}>
            <div className="modalBackground">
            </div>

            <div className="modal" style={modalStyle}>
                <h2>{title}</h2>
                {children}
                <div className="actions">
                    <BButton disabled={isLoading} second
                             onClick={handleSecondAction}>
                        {secondActionLabel || "Cancel"}
                    </BButton>
                    <BButton first
                             isLoading={isLoading}
                             onClick={handleFirstAction}
                             disabled={isFirstActionDisabled}
                    >
                        {firstActionLabel}
                    </BButton>
                </div>
            </div>
        </div>
    )
}
