import db from './db.js';

export default async function query(sql, params) {
  console.log({ sql, params });
  return new Promise((resolve, reject) => {
    db.all(sql, params, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
