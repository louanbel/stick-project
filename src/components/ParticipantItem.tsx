import {Participant} from "../types/Participant";
import PointListItem from "./PointListItem";
import '../styles/ParticipantItem.scss';
import {IoAddCircleOutline, IoRemoveCircleOutline} from "react-icons/io5";
import {generateAvatarFromSettings} from "../helpers/avatarHelper.ts";

type ParticipantItemProps = {
    participant: Participant
    onUpdate: (participant: Participant) => void;
}

export default function ParticipantItem({participant, onUpdate}: ParticipantItemProps,) {

    function handleIncreasePoints() {
        const updatedParticipant = {...participant, points: participant.points + 1};
        onUpdate(updatedParticipant);
    }

    function handleDecreasePoints() {
        if (participant.points > 0) {
            const updatedParticipant = {...participant, points: participant.points - 1};
            onUpdate(updatedParticipant);
        }
    }

    return (
        <div className='participantItem'>
            <img src={generateAvatarFromSettings(participant.avatar.settings)} alt={`Avatar of ${participant.name}`}/>
            <span className="participantName">{participant.name}</span>
            <IoRemoveCircleOutline disabled={participant.points == 0} className="deletePointButton"
                                   onClick={handleDecreasePoints}/>
            <PointListItem points={participant.points}/>
            <IoAddCircleOutline className="addPointButton"
                                onClick={handleIncreasePoints}/>
        </div>
    )
}
