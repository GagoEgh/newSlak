import { Message } from "./messages.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    img: string;
    messages:Message[]
}