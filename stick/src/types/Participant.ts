import {AvatarSettings, defaultAvatarSettings} from "../helpers/avatarHelper.ts";

export interface TParticipant {
    id: number;
    name: string;
    points: number;
}


export class Participant {
    private static idCounter = 0;
    public id: number;
    public name: string;
    public points: number;
    public avatar: AvatarSettings;

    static skeletonParticipant(): Participant {
        return new Participant("Fake name", 1, new AvatarSettings(defaultAvatarSettings), -1);
    }

    constructor(name: string, points: number = 1, avatar: AvatarSettings, id?: number) {
        this.avatar = avatar;
        this.id = id ? id : Participant.idCounter++;
        this.name = name;
        this.points = points;
    }
}
