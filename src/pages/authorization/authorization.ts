import BaseInput from '../../components/baseInput'
import template from './authorization.tmpl'
import Component from '../../core/component/component'
import ButtonPrimary from '../../components/buttonPrimary'
import ButtonInline from '../../components/buttonInline'

export default class AuthPage extends Component {
  constructor() {
    super({})
  }

  init() {
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login'
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password'
    })

    const buttonPrimary = new ButtonPrimary({
      label: 'Sign in'
    })

    const buttonInline = new ButtonInline({
      label: 'Create account',
      linkTo: '/registration',
      isSmall: true
    })

    this.children = {
      ...this.children,
      inputLogin,
      inputPassword,
      buttonPrimary,
      buttonInline
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
