import isEmpty from '../../utils/isEmpty'
import createElement from '../../utils/createElement'
import { IBaseComponent } from './baseComponent.types'

export default class BaseComponent implements IBaseComponent {
  element: Element | null
  components: Record<string, IBaseComponent> = {}
  layout: IBaseComponent
  template: string
  subElements: Record<string, HTMLElement>
  initComponents: () => void
  initLayout: () => void
  initEventListeners: () => void

  render = () => {
    if (this.initComponents) this.initComponents()

    if (this.initLayout) {
      this.initLayout()
      this.element = this.layout.element
      return this.element
    }

    this.element = createElement(this.template)
    this.subElements = this.getSubElements(this.element)

    if (!isEmpty(this.subElements)) this.renderComponents()
    if (this.initEventListeners) this.initEventListeners()

    return this.element
  }

  renderComponents = () => {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component]
      const { element } = this.components[component]
      if (element != null) {
        root.append(element)
      }
    })
  }

  getSubElements = ($element) => {
    const elements = $element.querySelectorAll('[data-element]')
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement
      return accum
    }, {})
  }

  destroy () {
    this.subElements = {}
    for (const component of Object.values(this.components)) {
      component.destroy()
    }
    this.remove()
  }

  remove () {
    if (this.element != null) {
      this.element.remove()
    }
  }
}
