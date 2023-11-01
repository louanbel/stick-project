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

    constructor(name: string, points: number = 1, id?: number) {
        this.id = id ? id : Participant.idCounter++;
        this.name = name;
        this.points = points;
    }
}
