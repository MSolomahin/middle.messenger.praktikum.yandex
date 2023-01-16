import template from './secondInput.tmpl'
import { SecondInputProps } from './secondInput.types'
import Component from '../../core/component'

export default class SecondInput extends Component {
  constructor (props: SecondInputProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
