export const getFilePath = (path?: string) => {
  if (!path) return ''
  return `https://ya-praktikum.tech/api/v2/resources${path}`
}
