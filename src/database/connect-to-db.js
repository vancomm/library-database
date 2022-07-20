import sqlite from 'sqlite3';

export default function connectToDb(path) {
  const db = new sqlite.Database(
    path,
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
