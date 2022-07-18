import execute from '../execute.js';

export default async function remove(db, table, where) {
  const placeholder = Object.keys(where).map((field) => `${field} = ?`).join(' AND ');
  const sql = `DELETE FROM ${table} WHERE ${placeholder}`;
  const values = Object.values(where);
  return execute(db, sql, values);
}
