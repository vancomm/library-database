import query from './query.js';

export default async function select(db, table, columns) {
  const sql = `SELECT ${columns || '*'} FROM ${table};`;
  return query(db, sql);
}
