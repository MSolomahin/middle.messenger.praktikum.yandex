export interface IBaseComponent {
  element: Element | null
  components: Record<string, IBaseComponent>
  layout?: IBaseComponent
  template: string
  subElements: Record<string, HTMLElement>
  initComponents?: () => void
  initLayout?: () => void
  initEventListeners: () => void
  render: () => Element | null
  renderComponents: () => void
  getSubElements: ($element: Element) => Record<string, HTMLElement>
  destroy: () => void
  remove: () => void
}
