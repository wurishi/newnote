import MyBroadcastChannel from "./MyBroadcastChannel";

export interface Boardcast {
    init(): void;
    sendMessage(data: any): void;
    receiveMessage(callback: Function): void;
}

export default function createBoardcast(): Boardcast {
    return new MyBroadcastChannel('helloworld');
}