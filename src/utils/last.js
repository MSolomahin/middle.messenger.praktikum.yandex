export default function last(list) {
  if (Array.isArray(list)) {
    return list.at(-1);
  }
}
