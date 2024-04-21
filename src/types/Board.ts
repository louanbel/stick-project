import {Participant} from "./Participant";

abstract class AbstractBoard {
    public id: number;
    public name: string;
    public endTime: string;

    constructor(id: number, name: string, endTime: string) {
        this.id = id;
        this.name = name;
        this.endTime = endTime;
    }

}

export class Board extends AbstractBoard {
    public participants: Participant[];

    static skeletonPartialBoard(): PartialBoard {
        return new PartialBoard(-1, "Fake's board", "Thu, 07 Dec 2023 10:21:24 GMT", 1);
    }

    constructor(id: number, name: string, endTime: string, participants: Participant[]) {
        super(id, name, endTime);
        this.participants = participants;
    }

}

export class PartialBoard extends AbstractBoard {
    public participantCount: number;

    constructor(id: number, name: string, endTime: string, participantCount: number) {
        super(id, name, endTime);
        this.participantCount = participantCount;
    }

}
