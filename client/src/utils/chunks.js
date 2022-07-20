export default function chunks(arr, size) {
  return arr.reduce((acc, cur) => {
    if (acc.length < 1) return [[cur]];
    const [last] = acc.slice(-1);
    return last.length < size ? [...acc.slice(0, -1), [...last, cur]] : [...acc, [cur]];
  }, []);
}
