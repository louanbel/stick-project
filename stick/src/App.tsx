import './App.css'
import {Participant} from "./types/Participant";
import ParticipantItem from "./components/ParticipantItem";

function App() {
    const testUserList: Participant[] = [{name: "Louis", points: 4}, {name: "Elodie", points: 3}, {name: "Jean", points: 3}];

    return (
        <>
            {testUserList.map(participant => <ParticipantItem participant={participant}/>)}
        </>
    )
}

export default App
