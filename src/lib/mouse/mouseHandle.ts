
import { mouse, up, down, right, left } from '@nut-tree/nut-js';

export const mouseMove = async (direction: string, distance: string[]) => {
  const shift = Number(...distance)
  switch (direction) {
    case 'up':
      await mouse.move(up(shift))
      break;

    case 'down':
      await mouse.move(down(shift))
      break;

    case 'left':
      await mouse.move(left(shift))
      break;

    case 'right':
      await mouse.move(right(shift))
      break;

    default:
      break;
  }
}

export const mousePosition = async (): Promise<string> => {
  const { x, y } = await mouse.getPosition();
  return `${x},${y}`;

}
