import { IBaseComponent } from '../core/baseComponent/baseComponent.types'

const createSubElements = (
  elements: Record<string, IBaseComponent>
) => {
  const root = document.createElement('div')
  root.setAttribute('style', 'display: contents')

  for (const element of Object.values(elements)) {
    if (element.element != null) {
      root.append(element.element)
    }
  }

  return { element: root }
}

export default createSubElements
