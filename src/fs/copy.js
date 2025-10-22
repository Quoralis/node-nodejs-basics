import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files_copy');

const copy = async () => {
  try {
    await fs.readdir(srcDir);

    try {
      await fs.readdir(destDir);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    await fs.mkdir(destDir);
    await fs.cp(srcDir, destDir, { recursive: true });

  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();
