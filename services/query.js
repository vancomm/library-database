export default async function query(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
