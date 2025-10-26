import { createWriteStream } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { stdin } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  try {
    await pipeline(
      stdin,
      createWriteStream(filePath),
    );
  } catch (err) {
    console.error(err);
  }
};

await write();
