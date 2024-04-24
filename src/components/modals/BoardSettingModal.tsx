import '../../styles/modal/BModal.scss';
import '../../styles/modal/BoardSettingModal.scss';
import BModal from "./BModal";
import {Board, PointStyle} from "../../types/Board.ts";
import {useState} from "react";
import {updateBoard} from "../../helpers/boardHelper.ts";

type BBoardSettingModalProps = {
    className: string;
    board: Board;
    handleCancelAction: () => void;
    handleValidateAction: () => void;
}


export default function BoardSettingModal({
                                              className,
                                              handleCancelAction,
                                              handleValidateAction,
                                              board
                                          }: BBoardSettingModalProps) {
    const [pointStyle, setPointStyle] = useState<PointStyle>(board.pointStyle);
    const [isLoading, setIsLoading] = useState(false);

    function handleFirstAction() {
        setIsLoading(true);
        if (board.pointStyle != pointStyle) {
            board.pointStyle = pointStyle;
            updateBoard(board).then(() => {
                handleValidateAction();
            });
        } else {
            handleValidateAction();
        }
        setIsLoading(false);
    }

    return (
        <div className={className}>
            <BModal handleFirstAction={handleFirstAction}
                    handleSecondAction={handleCancelAction}
                    title={"Board settings"}
                    firstActionLabel={"Validate"}
                    isLoading={isLoading}
            >
                <div className={"setting"}>
                    <label htmlFor="pointStyle">Points style:</label>
                    <select value={pointStyle} name="pointStyle" id="pointStyle" className={"selectPointsStyle"}
                            defaultValue={pointStyle}
                            onChange={(newPointStyle) => setPointStyle(newPointStyle.target.value as PointStyle)}>
                        <option value="stick">Stick</option>
                        <option value="number">Number</option>
                        <option value="square" disabled>Square (not available)</option>
                    </select>
                </div>
            </BModal>
        </div>
    )
}
