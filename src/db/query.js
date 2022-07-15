export default async function query(db, sql, firstRow = false) {
  if (firstRow) {
    return new Promise((resolve, reject) => {
      db.get(sql, (e, row) => {
        if (e) reject(e);
        resolve(row);
      });
    });
  }
  return new Promise((resolve, reject) => {
    db.all(sql, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
