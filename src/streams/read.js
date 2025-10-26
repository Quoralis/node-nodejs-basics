import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname,'files','fileToRead.txt')

const read = async () => {
  try {
    await pipeline(
      createReadStream(filePath),
      stdout
    )
  }catch (e){
    console.error(e);
  }
};

await read();
