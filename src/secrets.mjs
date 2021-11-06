import fs from 'fs';

export default function read(secretNameAndPath) {
  try {
    return fs.readFileSync(`${secretNameAndPath}`, 'utf8');
  } catch(err) {
    if (err.code !== 'ENOENT') {
      console.error(`An error occurred while trying to read the secret: ${secretNameAndPath}. Err: ${err}`);
    } else {
      console.error(`Could not find the secret, probably not running in swarm mode: ${secretNameAndPath}. Err: ${err}`);
    }    
    return false;
  }
};