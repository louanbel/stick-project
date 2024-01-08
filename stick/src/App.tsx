import './App.css'
import BoardList from "./components/BoardList";
import BoardView from "./components/BoardView.tsx";
import { Routes, Route } from 'react-router-dom';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import LoginView from "./components/LoginView.tsx";
import React from "react";
import RegisterView from "./components/RegisterView.tsx";

function App() {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Routes>
                    <Route path="/" element={<BoardList />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                    <Route path="/board/:boardId" element={<BoardView />} />
                    <Route path="/about" element={<p>/about</p>} />
                </Routes>
            </LocalizationProvider>

        </>
    )
}

export default App
