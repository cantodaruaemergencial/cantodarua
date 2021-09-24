import { Initiative } from "./Initiatives";
import { Person } from "./People";


export interface Reception {
    id: number;
    person: Person;
    initiative: Initiative;
    Observation: string;
    ReceptionDate: Date;
}