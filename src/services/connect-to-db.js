import dotenv from 'dotenv';
import sqlite from 'sqlite3';

dotenv.config();

export default function connectToDb() {
  const db = new sqlite.Database(
    process.env.DATABASE_PATH,
    sqlite.OPEN_READWRITE,
    (e) => {
      if (e) {
        console.log(e.message);
        process.exit();
      }
    },
  );

  db.get('PRAGMA foreign_keys = ON');

  return db;
}
