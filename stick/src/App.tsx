import './App.css'
import BoardList from "./components/BoardList";
import ParticipantList from "./components/ParticipantList";
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<BoardList />} />
                <Route path="/board/:boardId" element={<ParticipantList />} />
                <Route path="/about" element={<p>/about</p>} />
            </Routes>
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