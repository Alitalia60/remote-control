import { appendLog } from './appendLog';
import { LOG_FILE } from '../../../index'

export const writeMessages = (mes: string | object) => {
  console.log(mes);

  if (LOG_FILE) {
    if (typeof mes === 'string') {
      appendLog(mes)
    }
    else {
      appendLog(mes.toString())
    }
  }
}

export const writeError = (mes: string) => {
  console.log('ERROR: ', mes);
  if (LOG_FILE) {
    appendLog(`ERROR: ${mes}`)
  }
}
