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
exports.mousePosition = exports.mouseMove = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const mouseMove = (direction, distance) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = Number(...distance);
    switch (direction) {
        case 'up':
            yield nut_js_1.mouse.move((0, nut_js_1.up)(shift));
            break;
        case 'down':
            yield nut_js_1.mouse.move((0, nut_js_1.down)(shift));
            break;
        case 'left':
            yield nut_js_1.mouse.move((0, nut_js_1.left)(shift));
            break;
        case 'right':
            yield nut_js_1.mouse.move((0, nut_js_1.right)(shift));
            break;
        default:
            break;
    }
});
exports.mouseMove = mouseMove;
const mousePosition = (duplex) => __awaiter(void 0, void 0, void 0, function* () {
    const { x, y } = yield nut_js_1.mouse.getPosition();
    duplex.write(`mouse_position ${x},${y}`);
});
exports.mousePosition = mousePosition;
