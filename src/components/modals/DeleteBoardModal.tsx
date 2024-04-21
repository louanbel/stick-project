import '../../styles/modal/BModal.scss';
import BModal from "./BModal";
import {PartialBoard} from "../../types/Board";
import axios from "axios";
import {useState} from "react";

type DeleteModalProps = {
    board: PartialBoard;
    handleCancelAction: () => void;
    handleValidateAction: () => void;
}


export default function DeleteBoardModal({
                                             board,
                                             handleCancelAction,
                                             handleValidateAction
                                         }: DeleteModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    function deleteBoard() {
        const deleteData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.delete(`https://stick-service.foelij1s8ku6i.eu-west-3.cs.amazonlightsail.com/boards/delete/${board?.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log(`The participant with id ${board.id} was deleted successfully :`, response.data);
                } else {
                    console.error(`Failed to delete the participant with id ${board.id} : `, response.data);
                }
            } catch (error) {
                console.error(`Error while deleting the participant with id ${board.id} :`, error);
            }
        };
        deleteData().then(() => {
            setIsLoading(false);
            handleValidateAction();
        });

    }

    return (
        <>
            <BModal handleFirstAction={deleteBoard} handleSecondAction={handleCancelAction}
                    isLoading={isLoading}
                    title={`Delete board "${board.name}"`}
                    firstActionLabel={"Delete"}>
                <div className="section">
                    <p>Are you sure you want to delete this board with
                        its {board.participantCount} participant{board.participantCount > 1 ? "s" : ''} ?</p>
                </div>
            </BModal>
        </>
    )
}
