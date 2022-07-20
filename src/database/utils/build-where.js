export default function buildWhere(whereObj) {
  const wherePlaceholder = Object.entries(whereObj)
    .map(([field, value]) => (/[%_]/.test(value)
      ? `${field} LIKE ?`
      : `${field} = ?`))
    .join(' AND ');
  return [`WHERE ${wherePlaceholder}`, Object.values(whereObj)];
}
