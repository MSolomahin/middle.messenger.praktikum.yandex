import BaseInput from '../../components/baseInput'
import ButtonInline from '../../components/buttonInline'
import ButtonPrimary from '../../components/buttonPrimary'
import Link from '../../components/link'
import Component from '../../core/component/component'
import template from './registration.tmpl'

export default class RegistrationPage extends Component {
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

    const buttonPrimary = new ButtonPrimary({
      label: 'Create account'
    })

    const buttonInline = new ButtonInline({
      label: 'Log in',
      linkTo: '/authorization',
      isSmall: true
    })

    const link = new Link({ label: 'Log in', linkTo: '/authorization', isSmall: true })

    this.children = {
      ...this.children,
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputPhone,
      inputPassword,
      inputPasswordRepeat,
      buttonPrimary,
      buttonInline,
      link
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
