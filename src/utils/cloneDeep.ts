function cloneDeep<T extends (object | null) = object>(obj: T) {
  if (isArray(obj)) {
    return cloneArray(obj)
  } else if (isObject(obj)) {
    return cloneObj(obj)
  } else {
    return obj
  }
}

function isObject(value: unknown): value is Record<string, string> {
  return (
    value != null &&
    typeof value === 'object'
  )
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function cloneArray(array: unknown[]): unknown[] {
  return array.map((item: any) => {
    if (isArray(item) || isObject(item)) {
      return cloneDeep(item)
    }
    return item
  })
}

function cloneObj(obj: unknown) {
  const result: Record<string, unknown> = {}

  for (const key of Object.keys((obj as any))) {
    if (isObject((obj as any)[key]) || isArray((obj as any)[key])) {
      result[key] = cloneDeep((obj as any)[key])
    } else {
      result[key] = (obj as any)[key]
    }
  }
  return result
}

export default cloneDeep
