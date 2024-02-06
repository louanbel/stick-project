import '../styles/BButton.scss';
import * as React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

type BButtonProps = {
    first?: boolean;
    second?: boolean;
    red?: boolean;
    submit?: boolean;
    children?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function BButton({first, second, red, children, onClick, disabled, submit, isLoading}: BButtonProps) {
    const styles = [
        first && "first",
        second && "second",
        red && "red"
    ].filter(Boolean).join(" ");

    return (
        <>
            <button type={!!submit ? 'submit' : 'button'}
                    disabled={!!disabled || isLoading} className={styles} onClick={onClick}>
                <div className={isLoading ? "hideChildren" : ""}>{children}</div>
                {isLoading && <div className="loading"><AiOutlineLoading3Quarters/></div>}
            </button>
        </>
    )
}
