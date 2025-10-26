import { Worker } from 'node:worker_threads';
import os from 'node:os';

const performCalculations = async () => {
  const cpus = os.cpus().length;
  const result = []
  let promises = [];
  for (let i = 0; i < cpus; i++) {
    const prom = new Promise((res,rej) => {
      const worker = new Worker('./worker.js');
      const resArr = {status:'',data: null}
      worker.postMessage(10 + i);
      worker.on('message', (n) => {
        resArr.data = n
        resArr.status = 'resolved'
        res()
      })
      worker.on('error', () => {
        resArr.status = 'error';
        resArr.data = null;
        res()
      });

      worker.on('exit', (code) => {
        if(code === 0){
          rej ( new Error('Failed to process worker thread') );
        }
      })

      result[i] = resArr;
    });
    promises.push(prom);

  }
  await Promise.all(promises);
  console.log(result);
};


await performCalculations();