import {AvatarSettings} from "../helpers/avatarHelper.ts";

export interface TParticipant {
    id: number;
    name: string;
    points: number;
}


export class Participant {
    public id: number;
    public name: string;
    public points: number;
    public avatar: AvatarSettings;

    constructor(name: string, points: number = 1, avatar: AvatarSettings, id: number) {
        this.avatar = avatar;
        this.id = id;
        this.name = name;
        this.points = points;
    }
}
