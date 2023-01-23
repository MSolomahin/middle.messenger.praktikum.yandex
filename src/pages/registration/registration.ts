import Component from '../../core/component/component'
import template from './registration.tmpl'
import { RegistrationFrom } from '../../modules/registrationForm'
import MainLayout from '../../layout/mainLayout'

export default class RegistrationPage extends Component {
  init() {
    this.children.mainLayout = new MainLayout({
      content: new RegistrationFrom()
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
