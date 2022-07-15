import execute from './execute.js';

export default async function update(db, table, where, data) {
  const setPlaceholder = Object.keys(data).map((field) => `${field} = ?`).join(', ');
  const wherePlaceholder = Object.keys(where).map((field) => `${field} = ?`).join(' AND ');
  const sql = `UPDATE ${table} SET ${setPlaceholder} WHERE ${wherePlaceholder}`;
  const values = [...Object.values(data), ...Object.values(where)];
  console.log({ sql, values });
  return execute(db, sql, values);
}
