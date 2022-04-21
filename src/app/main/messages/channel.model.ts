export interface Channel {
    id: number;
    channelName: string;
    users: ChannelUserModel[];
}

export interface ChannelUserModel {
    id: number;
    fullName: string;
    message: string;
    date: string | null;
    img: string;
    time: string | null;
}