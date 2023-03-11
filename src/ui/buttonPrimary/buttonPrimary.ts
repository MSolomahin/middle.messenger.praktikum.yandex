import template from './buttonPrimary.tmpl'
import { ButtonPrimaryProps } from './buttonPrimary.types'
import Component from '../../core/component'
import './buttonPrimary.style.scss'

export default class ButtonPrimary extends Component<ButtonPrimaryProps> {
  constructor(props: ButtonPrimaryProps) {
    const { type = 'button', disable = false } = props
    super({
      ...props,
      disable,
      attrs: {
        ...props.attrs,
        class: 'button-primary',
        type
      }
    }, 'button')
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
