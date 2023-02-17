const sanitizeValues = {
  '‘': '&apos',
  '“': '&quot',
  '>': '&gt',
  '<': '&lt'
}

export const sanitizer = (value: string) => {
    let curValue = value
    Object.entries(sanitizeValues).forEach(([key, value]) => {
        curValue = curValue.replace(key, value)
    })
    return curValue
}
