import '../styles/BButton.scss';
import * as React from "react";

type BButtonProps = {
    first?: boolean;
    second?: boolean;
    red?: boolean;
    submit?: boolean;
    children?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export default function BButton({first, second, red, children, onClick, disabled, submit}: BButtonProps) {
    const styles = [
        first && "first",
        second && "second",
        red && "red"
    ].filter(Boolean).join(" ");

    return (
        <>
            <button type={!!submit ? 'submit' : 'button'}
                    disabled={!!disabled} className={styles} onClick={onClick}>{children}</button>
        </>
    )
}
