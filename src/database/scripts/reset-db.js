import { closeSync, openSync } from 'fs';
import deleteDb from './delete-db.js';

export default function resetDb(path) {
  deleteDb(path);
  closeSync(openSync(path, 'w'));
}
