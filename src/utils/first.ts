export default function first <T>(list: T[]) {
  if (Array.isArray(list)) {
    return list[0]
  }
}
