import { isPlainObject, PlainObject } from './isPlainObject'

function queryStringify(data: PlainObject): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const value = data[key]
    const endLine = index < keys.length - 1 ? '&' : ''

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<PlainObject>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      )

      return `${result}${queryStringify(arrayValue)}${endLine}`
    }

    if (isPlainObject(value)) {
      const objValue = Object.keys(value ?? {}).reduce<PlainObject>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey]
        }),
        {}
      )

      return `${result}${queryStringify(objValue)}${endLine}`
    }

    return `${result}${key}=${value as string}${endLine}`
  }, '')
}

export default queryStringify
