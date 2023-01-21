import { WebSocketServer } from 'ws'
import { config as dotEnvConfig } from 'dotenv'

import { httpServer } from "./src/http_server/index";
import { wssHandle } from './src/lib/wss_utils/wssHandle';

dotEnvConfig();

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8181
const WSS_PORT: number = Number(process.env.WSS_PORT) || 8080

httpServer.listen(HTTP_PORT, () => {
  console.log('---------------------------------------------')
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
});

httpServer.on('close', () => {
  console.log('http server closed');

})
const wss = new WebSocketServer({
  port: WSS_PORT
})
console.log('Websocket server: ', wss.address());

wss.on('close', () => {
  console.log('WSS closed');
})

wss.on('connection', wssHandle);

process.on('exit', (code) => console.log('Process exit with code: ', code));

process.on('SIGINT', () => {
  wss.clients.forEach((socket) => {
    // Soft close
    socket.close();
    wss.clients.forEach((socket) => {
      const state = socket.readyState;
      if (state === 1 || state === 2) {
        socket.terminate();
      }
    });
  });
  wss.close();

  httpServer.close();
});
