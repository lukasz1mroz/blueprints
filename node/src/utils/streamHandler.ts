import fs from 'fs';
import { stdout } from 'process';

export const writeFile = (path: string, data: any) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(data));
  }
};

export const handleStream = (readPath: string, writePath: string) => {
  const writeStream = fs.createWriteStream(writePath);
  const readStream = fs.createReadStream(readPath);

  readStream.pipe(stdout);

  // Auto backpressure handling
  readStream.pipe(writeStream).on('error', console.error);

  readStream.on('error', console.error);

  readStream.on('end', () => console.log('stream ended'));
};
