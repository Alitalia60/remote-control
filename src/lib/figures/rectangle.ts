import { Button, mouse, left, right, up, down } from '@nut-tree/nut-js';

export const rectangle = async (value: string[]) => {

  let x = Number(value[0]);
  let y = x;
  if (value[1]) {
    y = Number(value[1]);
  }

  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(x));
  await mouse.move(down(y));
  await mouse.move(left(x));
  await mouse.move(up(y));
  await mouse.releaseButton(Button.LEFT);
};
