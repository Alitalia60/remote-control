import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from 'ws'
import { Button, mouse, left, right, up, down, straightTo, Region, Point } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;
const wss_PORT = 8080;

process.on('beforeExit', (code) => {
  console.log('on before exit code: ', code);
})

process.on('SIGINT', () => {
  prevent
  console.log('Received SIGINT. Press Control-D to exit.');
  console.log(wss.clients);

});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
});

const wss = new WebSocketServer({
  port: wss_PORT
})

wss.on('connection', async (ws, req) => {

  ws.on('message', async mes => {

    const incomingMess = mes.toString().trim();
    console.log('Client send: ', incomingMess);
    let cmd = (incomingMess);
    let value = [];
    if (incomingMess.includes(' ')) {
      [cmd, ...value] = incomingMess.split(' ');
    }
    console.log(cmd, value);
    const action = cmd.split('_').shift()
    const figure = cmd.includes('_') ? cmd.split('_').pop() : '';

    console.log(figure);
    // ws.send(incomingMess);
    const toDo = {
      rectangle: () => rectangle(100, 200),
      // rectangle: console.log('rectangle(100, 200)'),
      square: () => square(100),
      circle: () => circle(100),
      up: () => mouse.move(up(100)),
      // up: console.log('mouse.move(up(100))'),
      down: () => mouse.move(down(100)),
      left: () => mouse.move(left(100)),
      right: () => mouse.move(right(100)),
      position: async () => {
        const { x, y } = await mouse.getPosition();
        console.log(`${incomingMess} ${x}, ${y}`);
        ws.send(`${incomingMess} ${x},${y}`)
      },
      scrn: () => snapshot()
    }
    // console.log(figure);
    try {
      toDo[figure]()

    } catch (error) {
      console.log('Unknown command ', cmd);
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

const circle = async (radius) => {
  const centrePoint = await mouse.getPosition();
  const startPoint = new Point(centrePoint.x + radius, centrePoint.y);

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