import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const renameFilePath = path.join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
  try {
    await fs.stat(filePath);
    const targetExists = await fs.stat(renameFilePath).catch(() => null);
    if (targetExists) throw new Error('FS operation failed');
    await fs.rename(filePath, renameFilePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
