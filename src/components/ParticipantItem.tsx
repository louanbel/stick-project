import {Participant} from "../types/Participant";
import PointListItem from "./PointListItem";
import '../styles/ParticipantItem.scss';
import {IoAddCircleOutline, IoRemoveCircleOutline} from "react-icons/io5";
import {generateAvatarFromSettings} from "../helpers/avatarHelper.ts";
import {PointStyle} from "../types/Board.ts";

type ParticipantItemProps = {
    participant: Participant;
    pointStyle: PointStyle;
    onUpdate: (participant: Participant) => void;
    onDeleteParticipant(participant: Participant): void;
}

export default function ParticipantItem({
                                            participant,
                                            pointStyle,
                                            onUpdate,
                                            onDeleteParticipant
                                        }: ParticipantItemProps,) {

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
            <div className={"left"}>
                <div className={"avatarSection"}>
                    <img className={"avatar"} src={generateAvatarFromSettings(participant.avatar.settings)}
                         alt={`Avatar of ${participant.name}`}/>
                    <div className={"trash"} onClick={() => onDeleteParticipant(participant)}>
                        <span className={"t1"}></span>
                        <span className={"t2"}></span>
                    </div>
                </div>
                <span
                    className="participantName">{participant.name.length > 12 ? `${participant.name.substring(0, 12)}...` : participant.name}</span>
            </div>
            <div className={"right"}>
                <IoRemoveCircleOutline disabled={participant.points == 0} className="deletePointButton"
                                       onClick={handleDecreasePoints}/>
                {pointStyle == "stick" ? <PointListItem points={participant.points}/> :
                    <span
                        className="points">{participant.points > 1 ? `${participant.points}pts` : `${participant.points}pt`}</span>}
                <IoAddCircleOutline className="addPointButton"
                                    onClick={handleIncreasePoints}/>
            </div>  
        </div>
    )
}
