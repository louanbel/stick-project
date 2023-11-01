import './App.css'
import {Participant} from "./types/Participant";
import ParticipantList from "./components/ParticipantList";

function App() {
    const testUserList: Participant[] = [new Participant("Louis", 4), new Participant("Elodie", 3), new Participant("Jean", 3)];

    return (
        <>
            <ParticipantList participants={[]}/>
        </>
    )
}

export default App
