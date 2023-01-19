import template from './baseInput.tmpl'
import { BaseInputProps } from './baseInput.types'
import Component from '../../core/component'

export default class BaseInput extends Component<BaseInputProps> {
  constructor(props: BaseInputProps) {
    super({
      ...props,
      attrs: {
        class: 'input-base'
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
