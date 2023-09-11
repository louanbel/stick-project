import {generateAvatar} from "../helpers/participantHelper";
import {Participant} from "../types/Participant";
import PointListItem from "./PointListItem";
import '../styles/ParticipantItem.scss';

type ParticipantItemProps = {
    participant: Participant
}

export default function ParticipantItem({participant}: ParticipantItemProps) {
    return (
        <div className='participantItem'>
            <img src={generateAvatar(participant.name)} alt={`Avatar of ${participant.name}`}/>
            <span className="participantName">{participant.name}</span>
            <PointListItem points={participant.points}/>
        </div>
    )
}
