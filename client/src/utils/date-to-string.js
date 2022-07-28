export default function dateToString(date) {
  return date.toISOString().split('T')[0];
}
