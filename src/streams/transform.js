import { Transform } from 'node:stream';
import { stdin, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

stdin.setEncoding('utf8');

const reverse = new Transform({
  decodeStrings: false,
  transform(chunk, encoding, callback) {

    const reversed = [...chunk].reverse().join('');
    callback(null, reversed);
  },
});

const transform = async () => {
  try {
    await pipeline(
      stdin,
      reverse,
      stdout,
    );
  } catch (err) {
    console.error('Pipeline error:', err);
  }
};

await transform();
