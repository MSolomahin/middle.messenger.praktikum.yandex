const createElement = (template: string) => {
  const element = document.createElement('div')
  element.innerHTML = template
  return element.firstElementChild as HTMLElement
}

export default createElement
