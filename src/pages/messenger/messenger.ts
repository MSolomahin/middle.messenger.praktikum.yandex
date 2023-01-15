import template from './messenger.tmpl'
import Avatar from '../../components/avatar'
import { IMessage, messages } from '../../assets/mocks/messages'
import ChatItem from '../../components/chatItem'
import Component from '../../core/component/component'

export default class MessengerPage extends Component {
  messages: IMessage[]

  constructor () {
    super('div', {})
    this.eventBus().emit(Component.EVENTS.INIT)
  }

  init = () => {
    const avatar = new Avatar({
      size: 'middle'
    })
    const avatarTiny = new Avatar({
      size: 'tiny'
    })
    const chatList = new ChatItem({
      ...messages[0],
      avatar
    })

    this.children.chatList = chatList
    this.children.avatar = avatarTiny
  }

  override render: () => DocumentFragment = () => {
    return this.compile(template, { ...this.props })
  }
}
