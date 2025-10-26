import {createReadStream } from 'node:fs'
import {pipeline} from 'node:stream/promises'
import {stdout} from 'node:process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const  {createHash} = await import('node:crypto');


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname,'files','fileToCalculateHashFor.txt')

const calculateHash = async () => {
  const hash = createHash('sha256').setEncoding('hex');

  try{
    await pipeline(
      createReadStream(filePath),
      hash,
      stdout
    )

  }catch(e){
    console.error(e);
  }

};

await calculateHash();
