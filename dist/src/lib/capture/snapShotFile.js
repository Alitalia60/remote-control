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
exports.snapShotFile = void 0;
const promises_1 = require("fs/promises");
const nut_js_1 = require("@nut-tree/nut-js");
const snapShotFile = () => __awaiter(void 0, void 0, void 0, function* () {
    let tmpDir = process.env.TMPDIR;
    if (!tmpDir) {
        tmpDir = process.cwd();
    }
    const actWin = yield (0, nut_js_1.getActiveWindow)();
    const actWinReg = yield actWin.region;
    let { x, y } = yield nut_js_1.mouse.getPosition();
    x = Math.max(x - 100, actWinReg.left);
    y = Math.max(y - 100, actWinReg.top);
    const captureReg = new nut_js_1.Region(x, y, 200, 200);
    nut_js_1.screen.config.highlightDurationMs = 500;
    nut_js_1.screen.config.highlightOpacity = 0.2;
    yield nut_js_1.screen.highlight(captureReg);
    return new Promise((resolve, rejects) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fileUrl = yield nut_js_1.screen.captureRegion('capt.png', captureReg, nut_js_1.FileType.PNG, tmpDir);
            let buff = yield (0, promises_1.readFile)(fileUrl);
            let base64data = buff.toString('base64');
            yield (0, promises_1.rm)(fileUrl);
            resolve(base64data);
        }
        catch (error) {
            rejects(error);
        }
    }));
});
exports.snapShotFile = snapShotFile;
