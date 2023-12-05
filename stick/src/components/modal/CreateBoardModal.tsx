import '../../styles/modal/BModal.scss';
import {useState} from "react";
import BModal from "./BModal";
import {Board} from "../../types/Board";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {FormControlLabel, Switch} from "@mui/material";

type BCreateBoardModalProps = {
    handleCancelAction: () => void;
    handleCreateBoard: (board: Board) => void;
}


export default function CreateBoardModal({handleCancelAction, handleCreateBoard}: BCreateBoardModalProps) {
    const [boardNameInput, setBoardNameInput] = useState("");
    const [endDateTime, setEndDateTime] = useState(dayjs().add(1, 'week'));
    const [isUnlimitedDuration, setIsUnlimitedDuration] = useState(false);
    const [isBoardNameError, setIsBoardNameError] = useState(false);
    const [isPastError, setIsPastError] = useState(false);
    const [isEndDateTimeNullError, setIsEndDateTimeNullError] = useState(false);

    function handleCreateBoardModal(): void {
        setIsBoardNameError(boardNameInput.length <= 0);

        if (endDateTime == null && !isUnlimitedDuration) {
            setIsEndDateTimeNullError(true);
        } else {
            setIsEndDateTimeNullError(false);
        }

        if (boardNameInput.length > 0 && ((!isPastError && !isEndDateTimeNullError) || isUnlimitedDuration)) {
            const createBoard = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/board/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: boardNameInput,
                            endTime: !isUnlimitedDuration ? endDateTime.format('YYYY-MM-DD HH:mm:ss') : null,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('The board was saved successfully : ', data);
                        handleCreateBoard(new Board(data.id, data.name, data.endTime, data.participants));
                    } else {
                        console.error('Failed to save the board data : ', response.json());
                    }


                } catch (error) {
                    console.error('Error while saving board data:', error);
                }
            };
            createBoard();

        }
    }

    function handleOnBoardNameChange(value: string) {
        setBoardNameInput(value);
        setIsBoardNameError(value.length <= 0);
    }


    function handleCancelModal() {
        handleCancelAction();
    }

    function handleOnDateTimeChange(dateTime) {
        if (dateTime.valueOf() <= dayjs().valueOf()) {
            setIsPastError(true);
        } else {
            setIsEndDateTimeNullError(false);
            setIsPastError(false);
            setEndDateTime(dateTime);
        }
    }

    return (
        <>
            <BModal handleFirstAction={handleCreateBoardModal} handleSecondAction={handleCancelModal}
                    title={"Create a new board"} firstActionLabel={"Create"}>
                <div className="section nameSection">
                    <label htmlFor="nameInput">Board name</label>
                    <input className="formInput" type="text" id="nameInput"
                           placeholder="Enter board's name"
                           onChange={(e) => handleOnBoardNameChange(e.target.value)}
                    />
                    {isBoardNameError && <span className="inputError">Name cannot be empty !</span>}
                </div>
                <div className="section endTimeSection">
                    <label htmlFor="endTimeInput">Board end date</label>
                    {!isUnlimitedDuration &&
                        <>
                            <DateTimePicker
                                hidden={isUnlimitedDuration}
                                id="endTimeInput"
                                value={endDateTime}
                                onChange={(dateTime) => handleOnDateTimeChange(dateTime)}/>
                            {isPastError && <span className="inputError">The end date can't be in the past !</span>}
                            {isEndDateTimeNullError && <span className="inputError">The end date can't be unset !</span>
                            }
                        </>
                    }
                    <FormControlLabel
                        control={
                            <Switch checked={isUnlimitedDuration}
                                    onChange={(value) => setIsUnlimitedDuration(value.target.checked)}
                                    name="unlimitedDuration"/>
                        }
                        label="Unlimited duration"
                    />
                </div>
            </BModal>
        </>
    )
}
