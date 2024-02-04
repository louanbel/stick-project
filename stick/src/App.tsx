import './App.css'
import BoardListView from "./components/views/BoardListView.tsx";
import BoardView from "./components/views/BoardView.tsx";
import { Routes, Route } from 'react-router-dom';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import LoginView from "./components/views/LoginView.tsx";
import RegisterView from "./components/views/RegisterView.tsx";

function App() {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Routes>
                    <Route path="/" element={<BoardListView />} />
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
