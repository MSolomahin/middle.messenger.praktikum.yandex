export const getFilePath = (path?: string) => {
  if (!path) return ''
  return `${process.env.BASE_URL!}/resources${path}`
}
