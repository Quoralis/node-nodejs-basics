import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirPath = path.join(__dirname,'files');

const list = async () => {
  try {
    const files = await fs.readdir(dirPath);
    console.log(files);
  }catch (err){
    if(err.code === 'ENOENT'){
      throw new Error('FS operation failed') ;
    }
    throw err;
  }
};

await list();
