export default function trim(val: string, deleteValue: string = ' ') {
  if (deleteValue === ' ') {
    return val.trim()
  }
  let i = 0
  let j = val.length - 1
  while (deleteValue.includes(val[i])) i++
  while (deleteValue.includes(val[j])) j--
  return val.slice(i, j + 1)
}
