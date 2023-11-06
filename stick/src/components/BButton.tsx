import '../styles/BButton.scss';
import * as React from "react";

type BButtonProps = {
    first?: boolean;
    second?: boolean;
    red?: boolean;
    children?: React.ReactNode;
    onClick: () => void;
}

export default function BButton({first, second, red, children, onClick}: BButtonProps) {
    const styles = [
        first && "first",
        second && "second",
        red && "red"
    ].filter(Boolean).join(" ");

    return (
        <>
            <button className={styles} onClick={onClick}>{children}</button>
        </>
    )
}
