import BaseInput from '../../components/baseInput'
import Component from '../../core/component/component'
import AuthLayout from '../../layout/authLayout'
import template from './registration.tmpl'

export default class RegistrationPage extends Component {
  protected componentDidMount() {
    const form = this.element?.querySelector('form')
    form?.addEventListener('submit', this._handleSubmit)
  }

  private readonly _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement

    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
  }

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

    const subComponents = [inputFirstName, inputSecondName, inputLogin, inputEmail, inputPassword, inputPasswordRepeat, inputPhone]

    this.children.authLayout = new AuthLayout({
      title: 'Create account',
      primaryText: 'Create account',
      inlineLink: '/authorization',
      inlineText: 'Log in',
      subComponents
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
