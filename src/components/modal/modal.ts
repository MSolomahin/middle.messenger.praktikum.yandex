import template from './modal.tmpl'
import { ModalProps } from './modal.types'
import Component from '../../core/component'
import ButtonPrimary from '../buttonPrimary/buttonPrimary'

export default class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
      attrs: {
        class: 'modal'
      }
    })
  }

  init() {
    const button = new ButtonPrimary({
      label: this.props.buttonTitle
    })

    this.children.button = button
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
