/// <reference path="../typings/index.d.ts" />
import Server from 'socket.io';

export default function startServer() {
    const io = new Server().attach(8090);
}