import BaseInput from '../../ui/baseInput'
import template from './authorization.tmpl'
import Component from '../../core/component/component'
import AuthLayout from '../../layout/authLayout/authLayout'

export default class AuthPage extends Component {
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
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login'
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password'
    })

    const subComponents = [inputLogin, inputPassword]
    this.children.authLayout = new AuthLayout({
      title: 'Log in',
      primaryText: 'Sign In',
      inlineLink: '/registration',
      inlineText: 'Create account',
      subComponents
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
