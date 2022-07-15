import query from './query.js';

export default async function selectPage(db, table, columns, limit, offset = 0) {
  const sql = `SELECT ${columns || '*'} FROM ${table} LIMIT ${offset}, ${limit};`;
  console.log(sql);
  return query(db, sql);
}
