import routes from '../../../../assets/const/routing'
import Form from '../../../../components/form'
import Component from '../../../../core/component'
import BaseInput from '../../../../ui/baseInput'
import Validator from '../../../../utils/validator'
import SignInController from '../../controllers/signInController'

export class AuthorizationForm extends Component {
  constructor() {
    super({
      validator: new Validator()
    })
  }

  init() {
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login',
      value: 'solomahin',
      validate: this.props.validator.checkLogin
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password',
      value: 'qwe123QWE',
      validate: this.props.validator.checkPassword
    })

    const subComponents = [inputLogin, inputPassword]
    this.children.content = new Form({
      title: 'Log in',
      buttonText: 'Sign In',
      linkPath: routes.registration,
      linkText: 'Create account',
      subComponents,
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

    if (allIsValid) {
      const data = Object.fromEntries(formData.entries())
      SignInController.logIn(data)
    }
  }

  render() {
    return this.compile({ ...this.props })
  }
}
