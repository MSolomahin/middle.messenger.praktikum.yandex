import template from './secondInput.tmpl'
import { InputDisabled, SecondInputProps } from './secondInput.types'
import Component from '../../core/component'
import './secondInput.style.css'

export default class SecondInput extends Component<SecondInputProps> {
  constructor(props: SecondInputProps) {
    const { type = 'text', disabled = InputDisabled.false } = props
    super({
      ...props,
      type,
      disabled
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
