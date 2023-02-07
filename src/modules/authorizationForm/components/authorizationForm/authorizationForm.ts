import routes from '../../../../assets/const/routing'
import Form from '../../../../components/form'
import Component from '../../../../core/component'
import BaseInput from '../../../../ui/baseInput'
import Validator from '../../../../utils/validator'

export class AuthorizationForm extends Component<{ validator: Validator }> {
  constructor() {
    super({
      validator: new Validator()
    })
  }

  init() {
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login',
      validate: this.props.validator.checkLogin
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password',
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
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
    console.log('Data are correctly:', allIsValid)
  }

  render() {
    return this.compile({ ...this.props })
  }
}
