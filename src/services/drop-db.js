import {
  existsSync, unlinkSync, closeSync, openSync,
} from 'fs';

export default function dropDatabase() {
  if (existsSync(process.env.DATABASE_PATH)) {
    unlinkSync(process.env.DATABASE_PATH);
  }

  closeSync(openSync(process.env.DATABASE_PATH, 'w'));
}
