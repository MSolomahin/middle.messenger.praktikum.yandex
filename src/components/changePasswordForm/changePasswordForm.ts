import template from './changePasswordForm.tmpl'
import Component from '../../core/component'
import ButtonPrimary from '../../ui/buttonPrimary'
import './changePasswordForm.style.css'
import { ChangePasswordFormProps } from './changePasswordForm.types'
import SecondInput from '../../ui/secondInput'

export default class ChangePasswordForm extends Component<ChangePasswordFormProps> {
  constructor(props: ChangePasswordFormProps) {
    super(props)
  }

  init() {
    const inputOldPassword = new SecondInput({
      label: 'Old password',
      value: 'qwe123QWE',
      name: 'old_password',
      type: 'password',
      validate: this.props.validator.checkPassword.bind(this)
    })

    const inputNewPassword = new SecondInput({
      label: 'New password',
      value: 'qwe123QWE',
      name: 'new_password',
      type: 'password',
      validate: this.props.validator.checkPassword.bind(this)
    })

    const inputNewPasswordRepeat = new SecondInput({
      label: 'Repeat password',
      value: 'qwe123QWE',
      name: 'new_password_repeat',
      type: 'password',
      validate: this.props.validator.checkPassword.bind(this)
    })

    const buttonSavePassword = new ButtonPrimary({
        label: 'Save',
        type: 'submit',
        attrs: {
          id: 'button-password'
        }
      })

    this.children = {
      ...this.children,
      inputOldPassword,
      inputNewPassword,
      inputNewPasswordRepeat,
      buttonSavePassword
    }
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
