import { existsSync, unlinkSync } from 'fs';

export default function deleteDb(path) {
  if (existsSync(path)) unlinkSync(path);
}
