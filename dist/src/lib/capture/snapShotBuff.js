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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapShotBuff = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const jimp_1 = __importDefault(require("jimp"));
const setRegion_1 = require("../figures/setRegion");
const snapShotBuff = () => __awaiter(void 0, void 0, void 0, function* () {
    const { x, y } = yield (0, setRegion_1.setRegion)(200, 200);
    const captureReg = new nut_js_1.Region(x, y, 200, 200);
    return new Promise((resolve, rejects) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const image = yield nut_js_1.screen.grabRegion(captureReg);
            const imageRGB = yield image.toRGB();
            const jimpImage = new jimp_1.default({
                data: imageRGB.data,
                width: image.width,
                height: image.height,
            });
            const value = yield jimpImage.getBufferAsync(jimp_1.default.MIME_PNG);
            resolve(value.toString('base64'));
        }
        catch (error) {
            rejects(error);
        }
    }));
});
exports.snapShotBuff = snapShotBuff;
