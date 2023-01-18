import template from './buttonPrimary.tmpl'
import { ButtonPrimaryProps } from './buttonPrimary.types'
import Component from '../../core/component'

export default class ButtonPrimary extends Component<ButtonPrimaryProps> {
  constructor(props: ButtonPrimaryProps) {
    const { type = 'button' } = props
    super({ ...props, type })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
