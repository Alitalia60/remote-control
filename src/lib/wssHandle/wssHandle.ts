import { WebSocket, createWebSocketStream } from 'ws';

import { mouseMove, mousePosition } from '../mouse/mouseHandle';
import { rectangle } from '../figures/rectangle';
import { circle } from '../figures/circle';
import { snapShotBuff } from '../capture/snapShotBuff';
import { writeMessages } from '../utils/writeMessages';

export const wssHandle = async (ws: WebSocket) => {

  writeMessages('Client connected');

  ws.on('open', () => {
    writeMessages('webSocket open');
  })

  ws.on('close', () => {
    writeMessages('webSocket closed');
  })

  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (incomingMess: string) => {
    writeMessages('---------------------------------');
    writeMessages(`Client send: ${incomingMess}`);

    const [cmnd, ...value] = incomingMess.split(' ');

    interface IAction { [key: string]: () => Promise<void | boolean | string> | boolean }

    const actions: IAction = {
      mouse_up: () => mouseMove('up', value),
      mouse_down: () => mouseMove('down', value),
      mouse_left: () => mouseMove('left', value),
      mouse_right: () => mouseMove('right', value),
      draw_circle: () => circle(value),
      draw_rectangle: () => rectangle(value),
      draw_square: () => rectangle(value),
      mouse_position: () => mousePosition(wsStream),
      prnt_scrn: () => snapShotBuff()
        .then((buf) => {
          wsStream.write(`prnt_scrn ${buf}`)
        })
        .catch((err) => wsStream.write('Out_of_screen!')),
    };

    actions[cmnd]();

  });

  wsStream.on('close', () => {
    writeMessages('wsStream has closed');

  });

}