import Component from '../core/component'
import { Messenger } from '../modules/messenger'

export default class MessengerPage extends Component {
  init() {
    this.children.content = new Messenger()
  }

  render() {
    return this.compile({ ...this.props })
  }
}
