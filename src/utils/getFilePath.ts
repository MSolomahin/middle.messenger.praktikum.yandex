import { URIs } from '../assets/const/URI'

export const getFilePath = (path?: string) => {
  if (!path) return ''
  return `${URIs.BASE_URL}/resources${path}`
}
