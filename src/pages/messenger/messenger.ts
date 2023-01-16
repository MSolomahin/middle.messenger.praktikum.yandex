import template from './messenger.tmpl'
import Avatar from '../../components/avatar'
import { IMessage, messages } from '../../assets/mocks/messages'
import ChatItem from '../../components/chatItem'
import Component from '../../core/component'

export default class MessengerPage extends Component {
  messages: IMessage[]

  constructor () {
    super({})
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'tiny'
    })
    this.children.chatList = new ChatItem({
      ...messages[0]
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
