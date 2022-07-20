import execute from '../execute.js';
import buildWhere from '../utils/build-where.js';

export default async function remove(db, table, params) {
  const { where } = params;
  // const placeholder = Object.keys(where).map((field) => `${field} = ?`).join(' AND ');
  // const sql = `DELETE FROM ${table} WHERE ${placeholder}`;
  // const values = Object.values(where);

  const [whereClause, values] = buildWhere(where);

  const sql = `DELETE FROM ${table} ${whereClause}`;

  return execute(db, sql, values);
}
