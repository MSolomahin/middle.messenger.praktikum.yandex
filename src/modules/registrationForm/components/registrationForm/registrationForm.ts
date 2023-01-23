import Form from '../../../../components/form'
import Component from '../../../../core/component'
import BaseInput from '../../../../ui/baseInput'
import template from './registrationForm.tmpl'

export class RegistrationFrom extends Component {
  init() {
    const inputFirstName = new BaseInput({
      label: 'First Name',
      name: 'first_name'
    })
    const inputSecondName = new BaseInput({
      label: 'Second Name',
      name: 'second_name'
    })
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login'
    })
    const inputEmail = new BaseInput({
      label: 'Email',
      type: 'email',
      name: 'email'
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password'
    })
    const inputPasswordRepeat = new BaseInput({
      label: 'Password (repeat)',
      type: 'password'
    })
    const inputPhone = new BaseInput({
      label: 'Phone',
      type: 'tel',
      name: 'phone'
    })

    const subComponents = [
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
      subComponents,
      buttonText: 'Sign up',
      events: {
        submit: this._handleSubmit.bind(this)
      }
    })
  }

  private _handleSubmit (e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement

    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
