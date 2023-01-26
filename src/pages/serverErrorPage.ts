import Component from '../core/component'
import MainLayout from '../layout/mainLayout'
import { ServerError } from '../modules/serverError'

export default class ServerErrorPage extends Component {
  init() {
    this.children.content = new MainLayout({
      content: new ServerError()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
