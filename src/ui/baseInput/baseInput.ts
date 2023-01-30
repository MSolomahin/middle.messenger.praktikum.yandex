import template from './baseInput.tmpl'
import { BaseInputProps, InputError } from './baseInput.types'
import Component from '../../core/component'
import './baseInput.style.css'

export default class BaseInput extends Component<BaseInputProps> {
  constructor(props: BaseInputProps) {
    super({
      ...props,
      value: props.value ?? '',
      type: props.type ?? 'text',
      attrs: {
        class: 'input-base'
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
    if (!this.props?.validate) return
    const validMessage = this.props.validate(value)

    if (validMessage) {
      this.setProps({
        errorMessage: validMessage,
        isError: InputError.true,
        value
      })
    } else {
      this.setProps({
        errorMessage: '',
        isError: InputError.false,
        value
      })
    }
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
