import Component from '../core/component/component'
import { RegistrationFrom } from '../modules/registrationForm'
import MainLayout from '../layout/mainLayout'

export default class RegistrationPage extends Component {
  init() {
    this.children.layout = new MainLayout({
      content: new RegistrationFrom()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
