import '../styles/BButtonDropdown.scss';
import {useEffect, useRef, useState} from "react";

type BButtonDropdownProps = {
    label: String;
    elements: String[];
    handleOnClick: () => void;
}

function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
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
                        <a href="#">{element}</a>
                    )
                })}
            </div>
        </div>
    )
}
