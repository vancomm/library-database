export default async function execute(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (e, rows) => {
      if (e) reject(e);
      resolve(rows);
    });
  });
}
