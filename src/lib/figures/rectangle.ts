import { Button, mouse, left, right, up, down, Point } from '@nut-tree/nut-js';
import { setRegion } from './setRegion';

export const rectangle = async (value: string[]) => {

  const currentPoint = await mouse.getPosition();
  const dimX = Number(value[0]);
  let dimY = dimX;
  if (value[1]) {
    dimY = Number(value[1]);
  }

  const { x, y } = await setRegion(dimX, dimY);

  await mouse.setPosition(new Point(x, y));
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(dimX));
  await mouse.move(down(dimY));
  await mouse.move(left(dimX));
  await mouse.move(up(dimY));
  await mouse.releaseButton(Button.LEFT);
  await mouse.setPosition(currentPoint);
};
