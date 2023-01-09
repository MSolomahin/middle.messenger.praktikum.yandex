import BaseInput from '../../components/baseInput'
import AuthLayout from '../../layout/authLayout/authLayout'
import BaseComponent from '../../core/baseComponent'
import createSubElements from '../../utils/createSubElements'

export default class AuthPage extends BaseComponent {
  initComponents = async () => {
    const inputLogin = new BaseInput({
      label: 'Login',
      name: 'login'
    })
    const inputPassword = new BaseInput({
      label: 'Password',
      type: 'password',
      name: 'password'
    })

    this.components = {
      inputLogin,
      inputPassword
    }
  }

  initLayout = () => {
    const subComponents = createSubElements(this.components)

    const authLayout = new AuthLayout({
      title: 'Log in',
      subComponents,
      primaryText: 'Sign in',
      inlineText: 'Create account',
      inlineLink: '/registration'
    })
    this.layout = authLayout
  }
}
