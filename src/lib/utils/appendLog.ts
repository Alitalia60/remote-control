import { appendFile } from 'node:fs/promises';

const LogginMessage = true;

export async function appendLog(mes: string) {
  if (LogginMessage) {

    mes = `${new Date()}: \n ${mes} \n`;
    await appendFile('./log.txt', mes, { encoding: 'utf-8', flag: 'a+' })
  }

}