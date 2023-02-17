import template from './secondInput.tmpl'
import {
  SecondInputProps
} from './secondInput.types'
import Component from '../../core/component'
import './secondInput.style.css'

export default class SecondInput extends Component<SecondInputProps> {
  constructor(props: SecondInputProps) {
    const {
      type = 'text',
      disabled = false,
      value = ''
    } = props
    super({
      ...props,
      type,
      disabled,
      value,
      attrs: {
        class: 'second-input'
      }
    })
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        focusout: this._validateField.bind(this)
      }
    })
  }

  private _validateField(e: FocusEvent) {
    const value = (e.target as HTMLInputElement).value
    if (!value || !this.props?.validate) return
    const validMessage = this.props.validate(value)

    if (validMessage) {
      this.setProps({
        errorMessage: validMessage,
        value
      })
    } else {
      this.setProps({
        errorMessage: '',
        value
      })
    }
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
