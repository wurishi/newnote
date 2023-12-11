interface Boardcast {
    init(): void;
    sendMessage(data: any): void;
    receiveMessage(callback: Function): void;
}