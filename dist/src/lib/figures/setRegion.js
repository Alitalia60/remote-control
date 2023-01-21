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
exports.setRegion = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const setRegion = (dimX, dimY) => __awaiter(void 0, void 0, void 0, function* () {
    const actWin = yield (0, nut_js_1.getActiveWindow)();
    const { left, top, width, height } = yield actWin.region;
    let { x, y } = yield nut_js_1.mouse.getPosition();
    x = x - Math.ceil(dimX / 2);
    y = y - Math.ceil(dimY / 2);
    x = x >= left ? x : left;
    x = x + dimX / 2 >= width + left ? width + left : x;
    y = y >= top ? y : top;
    y = y + dimY / 2 >= height + top ? height + top : y;
    nut_js_1.screen.config.highlightDurationMs = 500;
    yield nut_js_1.screen.highlight(new nut_js_1.Region(x, y, dimX, dimY));
    return new nut_js_1.Point(x, y);
});
exports.setRegion = setRegion;
