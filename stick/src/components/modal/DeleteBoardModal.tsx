import '../../styles/modal/BModal.scss';
import BModal from "./BModal";
import {Board, PartialBoard} from "../../types/Board";

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

    function deleteBoard() {
        const deleteData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/boards/delete/${board?.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log(`The participant with id ${board.id} was deleted successfully :`, response.json());
                } else {
                    console.error(`Failed to delete the participant with id ${board.id} : `, response.json());
                }
            } catch (error) {
                console.error(`Error while deleting the participant with id ${board.id} :`, error);
            }
        };
        deleteData();
        handleValidateAction();
    }

    return (
        <>
            <BModal handleFirstAction={deleteBoard} handleSecondAction={handleCancelAction}
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
