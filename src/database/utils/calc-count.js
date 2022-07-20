export default function calcCount(limit, offset, total) {
  if (limit) {
    return offset
      ? Math.min(total - offset, limit)
      : Math.min(total, limit);
  }
  return offset ? total - offset : total;
}
