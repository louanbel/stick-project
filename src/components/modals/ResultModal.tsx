import '../../styles/modal/BModal.scss';
import '../../styles/modal/ResultModal.scss';
import {Participant} from "../../types/Participant";
import BModal from "./BModal";
import {generateAvatarFromSettings} from "../../helpers/avatarHelper.ts";
import html2canvas from "html2canvas";

type ResultModalProps = {
    className: string;
    participants: Participant[];
    handleValidateAction: () => void;
    boardName: string;
}


export default function ResultModal({
                                        className,
                                        participants,
                                        handleValidateAction,
                                        boardName
                                    }: ResultModalProps) {
    async function handleDownload() {
        const scoreboardElement = document.getElementById('scoreboard'); // L'ID de votre élément de classement
        if (scoreboardElement) {
            const canvas = await html2canvas(scoreboardElement);
            const image = canvas.toDataURL('image/png', 1.0);
            downloadImage(image, 'scoreboard.png');
        }
    }

    function downloadImage(blob: string, fileName: string) {
        const fakeLink = window.document.createElement('a');
        fakeLink.href = blob;
        fakeLink.download = fileName;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
    }

    return (
        <div className={className}>
            <BModal handleFirstAction={handleValidateAction} handleSecondAction={handleDownload}
                    secondActionLabel={"Download results"}
                    title={`Scoreboard of ${boardName}`}
                    firstActionLabel={"Done"}>
                <div id="scoreboard" className={"scoreboard"}>
                    {participants.length >= 3 &&
                        <div className="resultSection">
                            <div className={"secondParticipant"}>
                                <div className={"winnerProfile"}>
                                    <span>{participants[1].name}</span>
                                    <img src={generateAvatarFromSettings(participants[1].avatar.settings)}
                                         alt={`Avatar of ${participants[1].name}`}/>
                                </div>
                                <div className={"podium"}><span>2nd</span>
                                </div>
                            </div>
                            <div className={"firstParticipant"}>
                                <div className={"winnerProfile"}>
                                    <span>{participants[0].name}</span>
                                    <img src={generateAvatarFromSettings(participants[0].avatar.settings)}
                                         alt={`Avatar of ${participants[0].name}`}/>
                                </div>
                                <div className={"podium"}><span>1st</span>
                                </div>
                            </div>
                            <div className={"thirdParticipant"}>
                                <div className={"winnerProfile"}>
                                    <span>{participants[2].name}</span>
                                    <img src={generateAvatarFromSettings(participants[2].avatar.settings)}
                                         alt={`Avatar of ${participants[2].name}`}/>
                                </div>
                                <div className={"podium"}><span>3rd</span>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={"otherParticipants"}>
                        {participants.length >= 3 ?
                            participants.slice(3).map((p, i) => (
                                <div key={p.id} className={"participant"}>
                                    <div className={"profileSection"}>
                                        <span>{i + 4}th</span>
                                        <div>
                                            <img src={generateAvatarFromSettings(p.avatar.settings)}
                                                 alt={`Avatar of ${p.name}`}/>
                                        </div>
                                        <span className={"participantName"}>{p.name}</span>
                                    </div>
                                    <span className={"participantPoints"}>{p.points} points</span>
                                </div>
                            ))
                            :
                            participants.map((p, i) => (
                                <div key={p.id} className={"participant"}>
                                    <div className={"profileSection"}>
                                        <span>{i + 1}th</span>
                                        <div>
                                            <img src={generateAvatarFromSettings(p.avatar.settings)}
                                                 alt={`Avatar of ${p.name}`}/>
                                        </div>
                                        <span className={"participantName"}>{p.name}</span>
                                    </div>
                                    <span className={"participantPoints"}>{p.points} points</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </BModal>
        </div>
    )
}
