import { appendFile } from 'node:fs/promises';
import { LOG_FILE } from '../../../index'

export async function appendLog(mes: string) {
  if (LOG_FILE) {
    mes = `${new Date()}: \n ${mes} \n`;
    await appendFile('./log.txt', mes, { encoding: 'utf-8', flag: 'a+' })
  }

}