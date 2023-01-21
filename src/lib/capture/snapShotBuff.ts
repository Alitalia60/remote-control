import { Region, getActiveWindow, mouse, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const snapShotBuff = async () => {

  const actWin = await getActiveWindow();
  const actWinReg = await actWin.region;
  let { x, y } = await mouse.getPosition();
  x = Math.max(x - 100, actWinReg.left);
  y = Math.max(y - 100, actWinReg.top);

  const captureReg = new Region(x, y, 200, 200);
  screen.config.highlightDurationMs = 500;
  await screen.highlight(captureReg);

  return new Promise(async (resolve, rejects): Promise<void> => {
    try {
      const image = await screen.grabRegion(captureReg);
      const imageRGB = await image.toRGB();
      const jimpImage = new Jimp({
        data: imageRGB.data,
        width: image.width,
        height: image.height,
      });
      const value = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
      resolve(value.toString('base64'))

    } catch (error) {
      rejects(error)
    }
  });

}