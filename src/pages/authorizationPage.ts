import Component from '../core/component/component'
import MainLayout from '../layout/mainLayout'
import { AuthorizationForm } from '../modules/authorizationForm'

export default class AuthorizationPage extends Component {
  init() {
    this.children.layout = new MainLayout({
      content: new AuthorizationForm()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
