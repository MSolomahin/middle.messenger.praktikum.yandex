import template from './baseInput.tmpl'
import { BaseInputProps } from './baseInput.types'
import Component from '../../core/component'
import './baseInput.style.css'

export default class BaseInput extends Component<BaseInputProps> {
  constructor(props: BaseInputProps) {
    super({
      ...props,
      type: props.type ?? 'text',
      isError: props.error ? 'input-base__error_active' : '',
      attrs: {
        class: 'input-base'
      }
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
