import { WebSocketServer } from 'ws';
import { config as dotEnvConfig } from 'dotenv'

import { httpServer } from "./src/http_server/index";
import { wssHandle } from './src/lib/wssHandle/wssHandle';
import { writeMessages, writeError } from './src/lib/utils/writeMessages';

dotEnvConfig();

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8181;
const WSS_PORT: number = Number(process.env.WSS_PORT) || 8080;
export const LOG_FILE = Number(process.env.LOG_FILE) || 0;

httpServer.listen(HTTP_PORT, () => {
  console.log('---------------------------------------------')
  writeMessages(`Start static http server on the ${HTTP_PORT} port!`)
});
httpServer.on('close', () => {
  writeMessages('http server closed');

});
httpServer.on('error', (err) => writeError(`Http server: ${err.message}`));
httpServer.on('clientError', (err) => writeError(`Client http : ${err.message}`));

const wss = new WebSocketServer({ port: WSS_PORT });
console.log(`Websocket server: , ${wss.address()}`);

wss.on('error', (err) => writeError(err.message))
wss.on('close', () => {
  writeMessages('Websocket server closed')
});
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
  httpServer.close((err) => {
    if (err) {
      writeError(err.message)
    }
  });
  process.exit(0)
});
