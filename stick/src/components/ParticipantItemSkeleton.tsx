import '../styles/ParticipantItemSkeleton.scss';
import {Participant} from "../types/Participant.ts";
import {Skeleton} from "@mui/material";

export default function ParticipantItemSkeleton() {

    return (
        <div className='participantItemSkeleton'>
            <div className='heading'>
                <Skeleton variant="rectangular" width={20} height={20}/>
                <Skeleton variant="rectangular" width={20} height={50}/>
                <Skeleton variant="circular" width={80} height={80}/>
                <Skeleton variant="text" width={200}/>
            </div>
            <div>
                <Skeleton variant="circular" width={30} height={30}/>
                <Skeleton variant="rectangular" width={24} height={40}/>
                <Skeleton variant="circular" width={30} height={30}/>
            </div>
        </div>
    )
}
