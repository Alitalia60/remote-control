import { readFile, rm } from 'fs/promises';
import { FileType, Region, getActiveWindow, mouse, screen } from '@nut-tree/nut-js';

export const snapShotFile = async () => {

  let tmpDir = process.env.TMPDIR;
  if (!tmpDir) {
    tmpDir = process.cwd();
  }

  const actWin = await getActiveWindow();
  const actWinReg = await actWin.region;
  let { x, y } = await mouse.getPosition();
  x = Math.max(x - 100, actWinReg.left);
  y = Math.max(y - 100, actWinReg.top);

  const captureReg = new Region(x, y, 200, 200);

  screen.config.highlightDurationMs = 500;
  screen.config.highlightOpacity = 0.2;
  await screen.highlight(captureReg);

  return new Promise(async (resolve, rejects) => {
    try {
      const fileUrl = await screen.captureRegion('capt.png', captureReg, FileType.PNG, tmpDir);
      let buff = await readFile(fileUrl);

      let base64data = buff.toString('base64');

      await rm(fileUrl);
      resolve(base64data)

    } catch (error) {
      rejects(error)
    }
  });
}