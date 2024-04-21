import '../styles/ParticipantItemSkeleton.scss';
import {Skeleton} from "@mui/material";

export default function ParticipantItemSkeleton() {

    return (
        <div className='participantItemSkeleton'>
            <div className='heading'>
                <Skeleton variant="rectangular" width={20} height={20}/>
                <Skeleton variant="rectangular" width={20} height={50}/>
                <Skeleton variant="circular" width={80} height={80}/>
                <Skeleton variant="text" width={125}/>
            </div>
            <div>
                <Skeleton variant="rectangular" width={24} height={40}/>
            </div>
        </div>
    )
}
