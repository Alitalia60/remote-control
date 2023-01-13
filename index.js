import { httpServer } from "./src/http_server/index.js";
import { spawn } from 'node:child_process'
import { WebSocketServer } from 'ws'
import { Button, mouse, left, right, up, down, straightTo, centerOf, Region, getActiveWindow, Point } from '@nut-tree/nut-js';
import { IncomingMessage } from 'node:http';

const HTTP_PORT = 8181;
const wss_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
});

const wss = new WebSocketServer({
  port: wss_PORT
})

wss.on('connection', async (ws, req) => {

  ws.on('message', async mes => {

    console.log('Client send: ', mes.toString());
    const [, ...value] = mes.toString().split(' ');
    const cmd = (mes.toString().split(' ').shift());
    ws.send(cmd);
    const startPos = await mouse.getPosition();

    switch (cmd) {
      case 'draw_circle':
        await circle(startPos, Number(value[0]))
        break;
      case 'draw_square':
        await square(Number(value[0]))
        break;
      case 'draw_rectangle':
        await rectangle(Number(value[0]), Number(value[1]))
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    console.log('WS closing');
  })

})

wss.on('close', () => {
  console.log('WSS closing');
})

const square = async (dim) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(dim));
  await mouse.move(down(dim));
  await mouse.move(left(dim));
  await mouse.move(up(dim));
  await mouse.releaseButton(Button.LEFT);
};

const rectangle = async (deltaX, deltaY) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(deltaX));
  await mouse.move(down(deltaY));
  await mouse.move(left(deltaX));
  await mouse.move(up(deltaY));
  await mouse.releaseButton(Button.LEFT);
};

const circle = async (centrePoint, radius) => {

  let x = centrePoint.x + radius;
  let y = centrePoint.y;
  const startPoint = new Point(x, y);

  await mouse.setPosition(startPoint);
  await mouse.pressButton(Button.LEFT);

  for (let deg = 0; deg < 360; deg += 1) {
    const rad = Math.PI / 180 * deg;

    const deltaX = radius - Math.round(radius * Math.cos(rad));
    const deltaY = Math.round(radius * Math.sin(rad));

    x = startPoint.x - deltaX;
    y = startPoint.y + deltaY;

    await mouse.move(straightTo(new Point(x, y)));
  }
  await mouse.releaseButton(Button.LEFT);
};
