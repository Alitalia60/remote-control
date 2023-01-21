import { Region, getActiveWindow, mouse, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { setRegion } from '../figures/setRegion';

export const snapShotBuff = async (): Promise<string> => {

  const { x, y } = await setRegion(200, 200);

  const captureReg = new Region(x, y, 200, 200);

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