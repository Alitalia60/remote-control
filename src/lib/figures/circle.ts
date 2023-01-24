import { Button, mouse, straightTo, Point } from '@nut-tree/nut-js';
import { setRegion } from './setRegion';

export const circle = async (value: string[]): Promise<void> => {


  const radius = Number(...value);

  const leftTopPoint = await setRegion(radius * 2, radius * 2);

  const circleCentre = new Point(leftTopPoint.x + radius, leftTopPoint.y + radius);

  const startPoint = new Point(leftTopPoint.x + radius * 2, leftTopPoint.y + radius);

  await mouse.setPosition(startPoint);
  await mouse.pressButton(Button.LEFT);

  for (let deg = 0; deg < 360; deg += 1) {
    const rad = Math.PI / 180 * deg;

    const deltaX = radius - Math.round(radius * Math.cos(rad));
    const deltaY = Math.round(radius * Math.sin(rad));

    const x = startPoint.x - deltaX;
    const y = startPoint.y + deltaY;

    await mouse.move(straightTo(new Point(x, y)));
  }
  await mouse.releaseButton(Button.LEFT);
  await mouse.setPosition(circleCentre);
};

