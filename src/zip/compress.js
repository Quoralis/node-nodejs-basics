import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.join(__dirname, 'files', 'fileToCompress.txt');
const dstPath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  try {
    await pipeline(
      createReadStream(srcPath),
      createGzip(),
      createWriteStream(dstPath)
    );
  } catch (err) {
    console.error('Compression failed:', err?.message || err);
  }
};

await compress();
