export default function wildcard(expr, start = false, end = true) {
  return `${start ? '%' : ''}${expr}${end ? '%' : ''}`;
}
