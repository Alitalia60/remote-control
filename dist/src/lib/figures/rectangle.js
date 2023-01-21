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
exports.rectangle = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const setRegion_1 = require("./setRegion");
const rectangle = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPoint = yield nut_js_1.mouse.getPosition();
    const dimX = Number(value[0]);
    let dimY = dimX;
    if (value[1]) {
        dimY = Number(value[1]);
    }
    const { x, y } = yield (0, setRegion_1.setRegion)(dimX, dimY);
    yield nut_js_1.mouse.setPosition(new nut_js_1.Point(x, y));
    yield nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
    yield nut_js_1.mouse.move((0, nut_js_1.right)(dimX));
    yield nut_js_1.mouse.move((0, nut_js_1.down)(dimY));
    yield nut_js_1.mouse.move((0, nut_js_1.left)(dimX));
    yield nut_js_1.mouse.move((0, nut_js_1.up)(dimY));
    yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
    yield nut_js_1.mouse.setPosition(currentPoint);
});
exports.rectangle = rectangle;
