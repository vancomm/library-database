import query from '../query.js';

export default async function select(db, table, params) {
  const {
    columns, limit, offset, ...where
  } = params;
  const parts = ['SELECT'];
  const values = [];
  if (columns) {
    parts.push(columns.length === 1 ? columns[0] : `(${columns.join(',')}))`);
  } else {
    parts.push('*');
  }
  parts.push(`FROM ${table}`);
  if (Object.keys(where).length > 0) {
    const wherePlaceholder = Object.entries(where)
      .map(([field, value]) => (/[%_]/.test(value)
        ? `${field} LIKE ?`
        : `${field} = ?`))
      .join(' AND ');
    parts.push(`WHERE ${wherePlaceholder}`);
    values.push(...Object.values(where));
  }
  if (limit) parts.push(`LIMIT ${limit}`);
  if (offset) parts.push(`OFFSET ${offset}`);
  const sql = parts.join(' ');
  console.log({ sql, values });
  return query(db, sql, values);
}
