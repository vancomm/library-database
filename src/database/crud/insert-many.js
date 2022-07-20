import execute from '../execute.js';

export default async function insertMany(table, fields, rows) {
  if (rows.length < 1) return Promise.resolve();
  const placeholder = Array(rows.length)
    .fill(`(${Array(fields.length)
      .fill('?')
      .join(',')})`)
    .join(',');
  const sql = `INSERT INTO ${table}(${fields.join(',')}) VALUES ${placeholder}`;
  const values = rows.flat();
  return execute(sql, values);
}
