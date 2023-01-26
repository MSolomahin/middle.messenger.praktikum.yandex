import Component from '../core/component'
import BackButtonLayout from '../layout/backButtonLayout/backButtonLayout'
import { UserSettingsForm } from '../modules/userSettingsForm'

export default class UserSettingsPage extends Component {
  init() {
    this.children.content = new BackButtonLayout({
      linkPath: '/',
      content: new UserSettingsForm()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
