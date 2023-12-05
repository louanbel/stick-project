import './App.css'
import BoardList from "./components/BoardList";
import ParticipantList from "./components/ParticipantList";
import { Routes, Route } from 'react-router-dom';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Routes>
                    <Route path="/" element={<BoardList />} />
                    <Route path="/board/:boardId" element={<ParticipantList />} />
                    <Route path="/about" element={<p>/about</p>} />
                </Routes>
            </LocalizationProvider>

        </>
    )
}

export default App

/*
*         <Router>
            <Route exact path="/" element={BoardList}/>
            <Route path="/new-page/:boardId"
                   element={(props) => <ParticipantList boardId={props}/>}/>
        </Router>
*/