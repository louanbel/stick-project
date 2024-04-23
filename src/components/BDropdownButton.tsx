import '../styles/BDropdownButton.scss';
import {useEffect, useRef, useState} from "react";
import {IoChevronDownOutline} from "react-icons/io5";

type BDropdownButtonProps = {
    label: string;
    elements: string[];
    handleOnClicks: (() => void)[];
}


export default function BDropdownButton({label, elements, handleOnClicks}: BDropdownButtonProps) {
    const [isDropdownListOpen, setDropdownListOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleButtonDropdownClick() {
        setDropdownListOpen(!isDropdownListOpen);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownListOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, []);

    return (
        <div className={"buttonDropdown"} ref={dropdownRef}>
            <button className={isDropdownListOpen ? "deployed" : ""}
                    onClick={handleButtonDropdownClick}>{label}<IoChevronDownOutline className={"arrow"}/></button>
            <div className={"dropdownList"} hidden={!isDropdownListOpen}>
                {elements.map((element, index) => {
                    return (
                        <a href="#" onClick={handleOnClicks[index]}>{element}</a>
                    )
                })}
            </div>
        </div>
    )
}
