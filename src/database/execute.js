import db from './db.js';

export default async function execute(sql, params) {
  console.log({ sql, params });
  return new Promise((resolve, reject) => {
    db.run(sql, params, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
