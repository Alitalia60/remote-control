
import { mouse, up, down, right, left } from '@nut-tree/nut-js';
import internal from 'node:stream';

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

export const mousePosition = async (duplex: internal.Duplex): Promise<void> => {
  const { x, y } = await mouse.getPosition();
  duplex.write(`mouse_position ${x},${y}`);

}
