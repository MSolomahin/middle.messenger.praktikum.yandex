const sanitizeValues = {
  "'": '&apos',
  '"': '&quot',
  '>': '&gt',
  '<': '&lt'
}

export const sanitizeHTML = (value: string) => {
  let curValue = value
  Object.entries(sanitizeValues).forEach(([key, value]) => {
    const regExp = new RegExp(`[\\${key}]`, 'g')
    curValue = curValue.replace(regExp, value)
  })
  return curValue
}

export const sanitizeValue = (value: string) => {
  console.log(value.replace(/["]/g, '\''))
  return value.replace(/["]/g, '\'')
}
