import { MemeberModel } from "./member.model";

export interface Message {
    goTo: number;
    fromId:number;
    messages: string;
    date: string;
    time: string;
    user?:MemeberModel;
}