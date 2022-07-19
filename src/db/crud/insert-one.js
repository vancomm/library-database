import execute from '../execute.js';
import lastInsertRowId from '../utils/last-insert-rowid.js';

export default async function insertOne(db, table, data) {
  const [fields, values] = Object.entries(data)
    .reduce((acc, [field, value]) => {
      const [accF, accV] = acc;
      return [[...accF, field], [...accV, value]];
    }, [[], []]);
  const sql = `INSERT INTO ${table}(${fields.join(',')}) VALUES(${Array(values.length).fill('?').join(',')})`;
  return execute(db, sql, values)
    .then(() => lastInsertRowId(db));
}
