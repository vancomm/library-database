export default async function query(db, sql, params) {
  // console.log({ sql, params });
  return new Promise((resolve, reject) => {
    db.all(sql, params, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
