import execute from './execute.js';

export default async function insert(db, table, data) {
  const [fields, values] = Object.entries(data).reduce((acc, [field, value]) => {
    const [accF, accV] = acc;
    return [[...accF, field], [...accV, value]];
  }, [[], []]);
  const sql = `INSERT INTO ${table}(${fields.join(',')}) VALUES(${Array(values.length).fill('?').join(',')})`;
  return execute(db, sql, values);
}
