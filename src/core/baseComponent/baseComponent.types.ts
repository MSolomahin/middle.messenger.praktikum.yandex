export interface IBaseComponent {
  element: Element
  components: Record<string, IBaseComponent>
  layout?: IBaseComponent
  template: string
  subElements: Record<string, HTMLElement>
  initComponents?: () => void
  initLayout?: () => void
  initEventListeners: () => void
  render: () => Element
  renderComponents: () => void
  getSubElements: ($element: Element) => Record<string, HTMLElement>
  destroy: () => void
  remove: () => void
}
