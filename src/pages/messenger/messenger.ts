import template from './messenger.tmpl'
import Avatar from '../../ui/avatar'
import { IMessage, messages } from '../../assets/mocks/messages'
import ChatItem from '../../ui/chatItem'
import Component from '../../core/component'
import Chat from '../../components/chat'

export default class MessengerPage extends Component {
  messages: IMessage[] = []

  init() {
    this.children.avatar = new Avatar({
      size: 'tiny'
    })

    this.children.chat = new Chat()

    this.children.chatList = this.createChats(messages)
  }

  private createChats(props: IMessage[]) {
    return props.map((data) => {
      return new ChatItem({
        ...data,
        events: {
          click: () => {
            console.log('click')
          }
        }
      })
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
