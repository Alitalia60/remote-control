"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wssHandle = void 0;
const ws_1 = require("ws");
const mouseHandle_1 = require("../mouse/mouseHandle");
const rectangle_1 = require("../figures/rectangle");
const circle_1 = require("../figures/circle");
const snapShotBuff_1 = require("../capture/snapShotBuff");
const wssHandle = (ws) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Client connected');
    ws.on('open', () => {
        console.log('webSocket open');
    });
    ws.on('close', () => {
        console.log('webSocket closed');
    });
    const wsStream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8', decodeStrings: false });
    wsStream.on('data', (incomingMess) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('---------------------------------');
        console.log('Client send: ', incomingMess);
        const [cmnd, ...value] = incomingMess.split(' ');
        const actions = {
            mouse_up: () => (0, mouseHandle_1.mouseMove)('up', value),
            mouse_down: () => (0, mouseHandle_1.mouseMove)('down', value),
            mouse_left: () => (0, mouseHandle_1.mouseMove)('left', value),
            mouse_right: () => (0, mouseHandle_1.mouseMove)('right', value),
            draw_circle: () => (0, circle_1.circle)(value),
            draw_rectangle: () => (0, rectangle_1.rectangle)(value),
            draw_square: () => (0, rectangle_1.rectangle)(value),
            mouse_position: () => (0, mouseHandle_1.mousePosition)(wsStream),
            prnt_scrn: () => (0, snapShotBuff_1.snapShotBuff)()
                .then((buf) => {
                wsStream.write(`prnt_scrn ${buf}`);
            })
                .catch((err) => wsStream.write('Out_of_screen!')),
        };
        actions[cmnd]();
    }));
    wsStream.on('close', () => {
        console.log('wsStream has closed');
    });
});
exports.wssHandle = wssHandle;
