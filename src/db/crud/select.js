import query from '../query.js';
import buildWhere from '../utils/build-where.js';

export default async function select(db, table, params) {
  const {
    alias, columns, join, limit, offset, where,
  } = params;

  const parts = ['SELECT'];
  const values = [];

  if (columns) {
    parts.push(columns.length === 1
      ? columns[0]
      : `${columns.join(', ')}`);
  } else {
    parts.push('*');
  }

  parts.push(alias ? `FROM ${table} ${alias}` : `FROM ${table}`);

  if (join) {
    parts.push(`LEFT OUTER JOIN ${join.table}`);
    parts.push(`ON ${alias}.${join.left} = ${join.right}`);
  }

  if (where) {
    // const wherePlaceholder = Object.entries(where)
    //   .map(([field, value]) => (/[%_]/.test(value)
    //     ? `${field} LIKE ?`
    //     : `${field} = ?`))
    //   .join(' AND ');
    const [whereClause, whereValues] = buildWhere(where);
    parts.push(whereClause);
    values.push(...whereValues);
  }

  if (limit) parts.push(`LIMIT ${limit}`);

  if (offset) parts.push(`OFFSET ${offset}`);

  const sql = parts.join(' ');
  return query(db, sql, values);
}
