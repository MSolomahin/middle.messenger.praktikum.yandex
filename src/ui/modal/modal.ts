import template from './modal.tmpl'
import { ModalProps } from './modal.types'
import Component from '../../core/component'
import ButtonPrimary from '../buttonPrimary/buttonPrimary'
import './modal.style.scss'

export default class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    const { id = 'modalForm' } = props
    super({
      ...props,
      id,
      attrs: {
        class: 'modal'
      }
    })
    this.setProps({
      events: {
        click: this.handleOutSideClick.bind(this)
      }
    })
  }

  protected componentDidUpdate(oldProps: ModalProps, newProps: ModalProps): boolean {
    if (this.children.button instanceof Component) {
      this.children.button.setProps({
        label: newProps.buttonTitle
      })
    }
    return super.componentDidUpdate(oldProps, newProps)
  }

  handleOutSideClick(e: MouseEvent) {
    const modal = (e.target as HTMLElement).closest('div[data-value]')
    if (!modal) {
      this.hide()
    }
  }

  init() {
    const button = new ButtonPrimary({
      label: this.props.buttonTitle,
      type: 'submit'
    })

    this.children.button = button
    this.children.children = this.props.children
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
