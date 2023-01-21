"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const dotenv_1 = require("dotenv");
const index_1 = require("./src/http_server/index");
const wssHandle_1 = require("./src/lib/wss_utils/wssHandle");
(0, dotenv_1.config)();
const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WSS_PORT = Number(process.env.WSS_PORT) || 8080;
index_1.httpServer.listen(HTTP_PORT, () => {
    console.log('---------------------------------------------');
    console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
index_1.httpServer.on('close', () => {
    console.log('http server closed');
});
const wss = new ws_1.WebSocketServer({
    port: WSS_PORT
});
console.log('Websocket server: ', wss.address());
wss.on('close', () => {
    console.log('WSS closed');
});
wss.on('connection', wssHandle_1.wssHandle);
process.on('exit', (code) => console.log('Process exit with code: ', code));
process.on('SIGINT', () => {
    wss.clients.forEach((socket) => {
        socket.close();
        wss.clients.forEach((socket) => {
            const state = socket.readyState;
            if (state === 1 || state === 2) {
                socket.terminate();
            }
        });
    });
    wss.close();
    index_1.httpServer.close();
});
