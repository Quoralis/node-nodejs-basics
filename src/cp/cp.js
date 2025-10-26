import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stdin, stdout } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, 'files', 'script.js');

export const spawnChildProcess = async (args) => {
  const child = fork(scriptPath, args, {
    stdio: ['pipe', 'pipe', 'inherit','ipc'],
  });
  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);
};

await spawnChildProcess(['Hello','world']);