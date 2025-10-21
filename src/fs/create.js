import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const filePath   = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
  let fh;
  try {
    fh = await fs.open(filePath, 'ax');
    await fh.appendFile('I am fresh and young', 'utf8');
  } catch (err) {
    if (err?.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    throw err;
  } finally {
    await fh?.close();
  }
};

await create();
