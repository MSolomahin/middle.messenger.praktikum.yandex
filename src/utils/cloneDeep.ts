type Object<T = unknown> = {
  [k in string]: T
}

function cloneDeep<T>(obj: T | null) {
  if (isArray(obj)) {
    return cloneArray(obj)
  } else if (isObject(obj)) {
    return cloneObj(obj)
  } else {
    return obj
  }
}

function isObject(value: unknown): value is Record<string, string | Object> {
  return (
    value != null &&
    typeof value === 'object'
  )
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function cloneArray(array: unknown[]): unknown[] {
  return array.map((item: unknown) => {
    if (isArray(item) || isObject(item)) {
      return cloneDeep(item)
    }
    return item
  })
}

function cloneObj<T extends Object>(obj: T) {
  const result: Object = {}

  for (const key of Object.keys((obj))) {
    if (isObject(obj[key]) || isArray(obj[key])) {
      result[key] = cloneDeep(obj[key])
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

export default cloneDeep
