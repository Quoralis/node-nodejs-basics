import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
console.log(filePath);

const remove = async () => {
  try {
    await fs.rm(filePath);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await remove();
