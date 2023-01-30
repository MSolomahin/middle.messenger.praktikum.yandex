import Component from '../core/component'
import MainLayout from '../layout/mainLayout/mainLayout'
import { NotFound } from '../modules/notFound'

export default class NotFoundPage extends Component {
  init() {
    this.children.content = new MainLayout({
      content: new NotFound()
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
