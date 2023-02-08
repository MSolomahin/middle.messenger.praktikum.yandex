import routes from '../../../../assets/const/routing'
import Form from '../../../../components/form'
import Component from '../../../../core/component'
import { withUser } from '../../../../core/connectStore'
import store, { StoreEvents } from '../../../../core/connectStore/store'
import Router from '../../../../router'
import BaseInput from '../../../../ui/baseInput'
import Validator from '../../../../utils/validator'
import SignUpController from '../../controllers/signUpController'

class RegistrationFromModule extends Component {
  subComponents: Component[] = []

  constructor() {
    super({
      validator: new Validator()
    })

    store.on(StoreEvents.Updated, () => {
      const id = store.getState().user
      console.log(store.getState())
      if (id) {
        Router.navigate(routes.messenger)
      }
    })
  }

  init() {
    const inputFirstName = new BaseInput({
      label: 'First Name',
      name: 'first_name',
      value: 'Maxim',
      validate: this.props.validator.checkName.bind(this)
    })
    const inputSecondName = new BaseInput({
      label: 'Second Name',
      name: 'second_name',
      value: 'Solomakhin',
      validate: this.props.validator.checkName.bind(this)
    })
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login',
      value: 'MaximSol',
      validate: this.props.validator.checkLogin.bind(this)
    })
    const inputEmail = new BaseInput({
      label: 'Email',
      type: 'text',
      name: 'email',
      value: 'm.solomahin@mail.ru',
      validate: this.props.validator.checkEmail.bind(this)
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password',
      value: 'qwe123QWE',
      validate: this.props.validator.checkPassword.bind(this)
    })
    const inputPasswordRepeat = new BaseInput({
      label: 'Password (repeat)',
      type: 'password',
      name: 'password_repeat',
      value: 'qwe123QWE',
      validate: this.props.validator.checkPassword.bind(this)
    })
    const inputPhone = new BaseInput({
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      value: '89066789382',
      validate: this.props.validator.checkPhone.bind(this)
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
    this.children.content = new Form({
      title: 'Sign up',
      linkPath: routes.auth,
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

    if (allIsValid) {
      const data = Object.fromEntries(formData.entries())
      SignUpController.addUser(data)
    }
  }

  render() {
    return this.compile({ ...this.props })
  }
}

export const RegistrationFrom = withUser(RegistrationFromModule)
