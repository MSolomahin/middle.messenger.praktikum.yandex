import Component from '../core/component'
import BackButtonLayout from '../layout/backButtonLayout/backButtonLayout'
import { UserSettings } from '../modules/userSettingsForm'

export default class UserSettingsPage extends Component {
  init() {
    this.children.layout = new BackButtonLayout({
      linkPath: '/',
      content: new UserSettings()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
