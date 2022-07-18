import select from '../crud/select.js';

export default async function count(db, table) {
  const res = await select(db, table, { columns: ['COUNT(*) as count'] });
  return res[0].count;
}
