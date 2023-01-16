import { httpServer } from "./src/http_server/index.js";
import { createInterface } from 'node:readline'
import { WebSocketServer, createWebSocketStream } from 'ws'
import { Button, mouse, left, right, up, down, straightTo, Region, getActiveWindow, Point, screen, FileType, imageResource } from '@nut-tree/nut-js';
import { stdin, stdout } from 'node:process';
import Jimp from 'jimp'
import path from 'node:path';

const HTTP_PORT = 8181;
const wss_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
});

// const rl = createInterface({
//   input: stdin,
//   output: stdout,
//   prompt: 'server: >'
// })
// rl.prompt();
// rl.on('line', line => {
//   if (line.includes('.exit')) {
//     process.exit()
//   }
// })

const wss = new WebSocketServer({ port: wss_PORT });

wss.on('connection', async (ws, req) => {

  console.log('IP remote:', req.socket.remoteAddress);
  console.log(req.headers['host']);
  console.log(req.headers['origin']);

  const wsStream = createWebSocketStream(ws, {
    encoding: 'utf-8'
  });
  console.log("Websocket server connected");


  ws.on('message', async mes => {

    console.log('Client send: ', mes.toString());
    const [, ...value] = mes.toString().split(' ');
    const cmd = (mes.toString().split(' ').shift());
    ws.send(cmd);
    const startPos = await mouse.getPosition();

    const subCmd = cmd.split('_').shift();
    const subAct = cmd.split('_').pop();

    const action = {
      rectangle: async (v) => rectangle(v),
      square: async (v) => square(v),
      circle: async (v) => circle(v),
    }
    // switch (subCmd) {
    switch (cmd) {
      // case 'draw':
      //   (subAct) => {
      //     console.log(subCmd, subAct, value);
      //     subAct(value)
      //   }
      //   break
      case 'draw_circle':
        await circle(Number(value[0]))
        break;
      case 'draw_square':
        await square(Number(value[0]))
        break;
      case 'draw_rectangle':
        await rectangle(Number(value[0]), Number(value[1]))
        break;
      case 'prnt_scrn':
        await snapshot()
        break;
      case 'mouse_position':
        console.log('mouse_position');
        break;

      default:
        break;
    }
  });


  ws.onopen = (ev) => {
    console.log('WS opened. ev: ', ev.target);
  }

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

const circle = async (radius) => {

  let { x, y } = await mouse.getPosition();
  x += radius;

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

const snapshot = async () => {
  const actWin = await getActiveWindow();
  const actWinReg = await actWin.region;
  console.log(`activ windows: ${actWinReg}`);
  let { x, y } = await mouse.getPosition();
  // console.log(currentPoint);
  x = Math.max(x - 100, actWinReg.left);
  y = Math.max(y - 100, actWinReg.top);
  const captureReg = new Region(x, y, 200, 200);
  console.log(`Reg to capture: ${captureReg}`);
  // providerRegistry.imageToJimp
  // captureRegion(fileName: string,
  //               regionToCapture: Region | Promise < Region >,
  //               fileFormat ?: FileType,
  //               filePath ?: string,
  //               fileNamePrefix ?: string,
  //               fileNamePostfix ?: string): Promise < string >
  const __dirname = path.resolve(path.dirname(''));
  await screen.captureRegion('capt.jpg', captureReg, FileType.JPG, path.resolve(__dirname, './'));
  try {
    const replaceImage = await screen.find(imageResource("img.png"));
    console.log(`replaceImage: ${replaceImage}`);
  } catch (e) {
    console.error(e);
  }


}