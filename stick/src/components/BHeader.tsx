import '../styles/BHeader.scss';
import * as React from "react";
import BButton from "./BButton.tsx";
import {logoutUser} from "../helpers/loginHelper.ts";
import {useNavigate} from "react-router-dom";

type BButtonProps = {}

export default function BHeader({}: BButtonProps) {
    const navigate = useNavigate();
    function handleLogout() {
        logoutUser().then(() => {
            navigate('/login');
        });
    }

    return (
        <header>
            <h1>Stick</h1>
            <BButton first onClick={() => {
                handleLogout()
            }}>Logout</BButton>
        </header>
    )
}
