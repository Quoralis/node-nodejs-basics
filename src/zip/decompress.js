import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcZip = path.join(__dirname, 'files', 'archive.gz');
const dstPath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
  try {
    await pipeline(
      createReadStream(srcZip),
      createGunzip(),
      createWriteStream(dstPath)
    );
  } catch (err) {
    console.error('Decompression failed:', err?.message || err);
  }
};

await decompress();
