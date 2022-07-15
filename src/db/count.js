import query from './query.js';

export default async function count(db, table) {
  const sql = `SELECT COUNT(*) as count FROM ${table};`;
  const res = await query(db, sql, true);
  return res.count;
}
