import Form from '../../../../components/form'
import Component from '../../../../core/component'
import BaseInput from '../../../../ui/baseInput'
import Validator from '../../../../utils/validator'
import template from './registrationForm.tmpl'

export class RegistrationFrom extends Component<{ validator: Validator }> {
  subComponents: Component[] = []

  constructor() {
    super({
      validator: new Validator()
    })
  }

  init() {
    const inputFirstName = new BaseInput({
      label: 'First Name',
      name: 'first_name',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputSecondName = new BaseInput({
      label: 'Second Name',
      name: 'second_name',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputEmail = new BaseInput({
      label: 'Email',
      type: 'text',
      name: 'email',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputPasswordRepeat = new BaseInput({
      label: 'Password (repeat)',
      type: 'password',
      name: 'password_repeat',
      validate: this.props.validator.checkField.bind(this)
    })
    const inputPhone = new BaseInput({
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      validate: this.props.validator.checkField.bind(this)
    })

    this.subComponents = [
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputPassword,
      inputPasswordRepeat,
      inputPhone
    ]
    this.children.registrationForm = new Form({
      title: 'Sign up',
      linkPath: '/authorization',
      linkText: 'Log in',
      subComponents: this.subComponents,
      buttonText: 'Sign up',
      events: {
        submit: this._handleSubmit.bind(this)
      }
    })
  }

  private _handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement

    const formData = new FormData(target)

    const allIsValid = this.props.validator.checkForm(formData)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
    console.log('Data are correctly:', allIsValid)
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
