import Form from '../../../../components/form'
import Component from '../../../../core/component'
import BaseInput from '../../../../ui/baseInput'
import template from './authorizationForm.tmpl'

export class AuthorizationForm extends Component {
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
    this.children.authorizationForm = new Form({
      title: 'Log in',
      buttonText: 'Sign In',
      linkPath: '/registration',
      linkText: 'Create account',
      subComponents,
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
    return this.compile({ ...this.props }, template)
  }
}
