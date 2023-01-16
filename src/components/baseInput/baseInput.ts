import template from './baseInput.tmpl'
import { BaseInputProps } from './baseInput.types'
import Component from '../../core/component'

export default class BaseInput extends Component {
  constructor (props: BaseInputProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
