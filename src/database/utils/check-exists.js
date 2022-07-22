import select from '../crud/select.js';

export default async function checkExists(table, data) {
  const res = await select(table, { where: data });
  return res.length > 0;
}
