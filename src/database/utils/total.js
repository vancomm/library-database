import select from '../crud/select.js';

export default async function total(table) {
  const [{ count }] = await select(table, { columns: ['COUNT(*) as count'] });
  return count;
}
