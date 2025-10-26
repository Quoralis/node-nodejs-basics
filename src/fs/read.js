import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const st = await fs.stat(filePath);
    if (!st.isFile()) throw new Error('FS operation failed');

    const content = await fs.readFile(filePath, 'utf8');
    console.log(content);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
