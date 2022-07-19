import execute from '../execute.js';

export default async function insertMany(db, table, fields, rows) {
  const placeholder = Array(rows.length)
    .fill(`(${Array(fields.length)
      .fill('?')
      .join(',')})`)
    .join(',');
  const sql = `INSERT INTO ${table}(${fields.join(',')}) VALUES ${placeholder}`;
  const values = rows.flat();
  return execute(db, sql, values);
}
