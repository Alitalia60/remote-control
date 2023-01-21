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
exports.circle = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const setRegion_1 = require("./setRegion");
const circle = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const radius = Number(...value);
    const leftTopPoint = yield (0, setRegion_1.setRegion)(radius * 2, radius * 2);
    const circleCentre = new nut_js_1.Point(leftTopPoint.x + radius, leftTopPoint.y + radius);
    const startPoint = new nut_js_1.Point(leftTopPoint.x + radius * 2, leftTopPoint.y + radius);
    yield nut_js_1.mouse.setPosition(startPoint);
    yield nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
    for (let deg = 0; deg < 360; deg += 1) {
        const rad = Math.PI / 180 * deg;
        const deltaX = radius - Math.round(radius * Math.cos(rad));
        const deltaY = Math.round(radius * Math.sin(rad));
        const x = startPoint.x - deltaX;
        const y = startPoint.y + deltaY;
        yield nut_js_1.mouse.move((0, nut_js_1.straightTo)(new nut_js_1.Point(x, y)));
    }
    yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
    yield nut_js_1.mouse.setPosition(circleCentre);
});
exports.circle = circle;
