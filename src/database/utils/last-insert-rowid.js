import query from '../query.js';

export default async function lastInsertRowId() {
  const row = await query('SELECT last_insert_rowid() as id;');
  return row[0].id;
}
