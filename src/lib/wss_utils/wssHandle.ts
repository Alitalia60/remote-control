import { WebSocket, createWebSocketStream } from 'ws';
import { mouse } from '@nut-tree/nut-js';

import { mouseMove, mousePosition } from '../mouse/mouseHandle';
import { rectangle } from '../figures/rectangle';
import { circle } from '../figures/circle';
import { snapShotBuff } from '../capture/snapShotBuff';
import { ServerResponse } from 'http';

export const wssHandle = async (ws: WebSocket) => {

  // console.log('Websocket server: ', req.socket?.remoteAddress);
  console.log('Client connected');

  ws.on('open', () => {
    console.log('webSocket is opened');
  })

  ws.on('close', () => {
    console.log('webSocket has closed');
  })

  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async (incomingMess: string) => {
    console.log('---------------------------------');
    console.log('Client send: ', incomingMess);

    const [cmd, ...value] = incomingMess.split(' ');

    switch (cmd) {
      case 'mouse_up': await mouseMove('up', value)
        break;

      case 'mouse_down': await mouseMove('down', value)
        break;

      case 'mouse_left': await mouseMove('left', value)
        break;

      case 'mouse_right': await mouseMove('right', value)
        break;

      case 'mouse_position':
        const { x, y } = await mouse.getPosition();
        wsStream.write(`${incomingMess} ${x},${y}`);
        break;

      case 'draw_rectangle': await rectangle(value)
        break;

      case 'draw_square': await rectangle(value)
        break;

      case 'draw_circle': await circle(value)
        break;

      // case 'prnt_scrn': snapShotFile()
      case 'prnt_scrn': snapShotBuff()
        .then(buf => {
          wsStream.write(`prnt_scrn ${buf}`)
        })
        .catch(err => wsStream.write('Out_of_screen!'))
        break;

      default:
        wsStream.write('Unknown_command')
    }

  });

  wsStream.on('close', () => {
    console.log('wsStream has closed');

  });

}