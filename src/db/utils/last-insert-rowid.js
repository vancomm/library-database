import query from '../query.js';

export default async function lastInsertRowId(db) {
  const row = await query(db, 'SELECT last_insert_rowid() as id;');
  return row[0].id;
}
