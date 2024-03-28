import '../styles/BButtonDropdown.scss';
import {RefObject, useEffect, useRef, useState} from "react";

type BButtonDropdownProps = {
    label: string;
    elements: string[];
    handleOnClick: () => void;
}

function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                alert("You clicked outside of me!");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function BButtonDropdown({label, elements, handleOnClick}: BButtonDropdownProps) {
    const [isDropdownListOpen, setDropdownListOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function handleButtonDropdownClick() {
        setDropdownListOpen(!isDropdownListOpen);
    }

    return (
        <div className={"buttonDropdown"}>
            <button className={isDropdownListOpen ? "deployed" : ""}
                    onClick={handleButtonDropdownClick}>{label}</button>
            <div className={"dropdownList"} hidden={!isDropdownListOpen}>
                {elements.map((element) => {
                    return (
                        <a href="#" onClick={handleOnClick}>{element}</a>
                    )
                })}
            </div>
        </div>
    )
}
