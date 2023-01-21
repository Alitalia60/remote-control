import { Point, Region, getActiveWindow, mouse, screen, right } from '@nut-tree/nut-js';

export const setRegion = async (dimX: number, dimY: number): Promise<Point> => {

  const actWin = await getActiveWindow();
  const { left, top, width, height } = await actWin.region;

  let { x, y } = await mouse.getPosition();

  x = x - Math.ceil(dimX / 2);
  y = y - Math.ceil(dimY / 2);

  x = x >= left ? x : left;
  x = x + dimX / 2 >= width + left ? width + left : x;

  y = y >= top ? y : top;
  y = y + dimY / 2 >= height + top ? height + top : y;

  screen.config.highlightDurationMs = 500;
  await screen.highlight(new Region(x, y, dimX, dimY));

  return new Point(x, y)

}