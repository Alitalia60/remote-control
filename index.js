import { httpServer } from "./src/http_server/index.js";
import { spawn } from 'node:child_process'
import { WebSocketServer } from 'ws'
import { Button, mouse, left, right, up, down, straightTo, centerOf, Region, getActiveWindow } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;
const wss_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
});

const cp = spawn('mspaint.exe');
cp.on('message', async mes => {

  const windowRef = await getActiveWindow();
  const title = await windowRef.title
  const region = await windowRef.region
  console.log(title, region)

  const [cmd, value] = mes.toString().split(' ');
  const numValue = Number(value)
  console.log('Client`s command: ', cmd, value);
  // switch (cmd) {
  //   case 'mouse_up':
  //     await mouse.move(up(numValue))
  //     break;
  //   case 'mouse_down':
  //     await mouse.move(down(numValue))
  //     break;
  //   case 'mouse_left':
  //     await mouse.move(left(numValue))
  //     break;
  //   case 'mouse_right':
  //     await mouse.move(right(numValue))
  //     break;
  //   case 'draw_rectangle':
  //     await mouse.pressButton(Button.LEFT);
  //     await square();
  //     await mouse.releaseButton(Button.LEFT);
  //     await mouse.move(
  //       straightTo(
  //         centerOf(
  //           new Region(100, 100, 200, 300)
  //         )
  //       )
  //     );
  //     break;
  //   default:
  //     break;
  // }
}
)

const windowRef = await getActiveWindow();

const wss = new WebSocketServer({
  port: wss_PORT
})
console.log('Web socket swerver address: ', wss.address());

wss.on('connection', async (ws, req) => {

  ws.on('message', async mes => {
    cp.send(mes)
  });
  ws.on('close', () => {
    console.log('WS closing');
  })

})

wss.on('close', () => {
  console.log('WSS closing');
})

const square = async () => {
  await mouse.move(right(200));
  await mouse.move(down(200));
  await mouse.move(left(200));
  await mouse.move(up(200));
};
