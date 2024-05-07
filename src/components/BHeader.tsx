import '../styles/BHeader.scss';
import BButton from "./BButton.tsx";
import {logoutUser} from "../helpers/loginHelper.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type BButtonProps = {}

export default function BHeader({}: BButtonProps) {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    function handleLogout() {
        setIsLoggingOut(true);
        logoutUser().then(() => {
            navigate('/login');
            setIsLoggingOut(false);
        });
    }

    return (
        <header>
            <h1>Stick</h1>
            <BButton first onClick={() => {
                handleLogout()
            }} isLoading={isLoggingOut}>Logout</BButton>
        </header>
    )
}
