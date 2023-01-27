import { chats } from '../assets/mocks/messages'
import Component from '../core/component'
import Chat from '../components/chat'
import ChatsList from '../components/chatsList'
import ChatsLayout from '../layout/chatsLayout/chatsLayout'

export default class MessengerPage extends Component {
  init() {
    const chat = new Chat()
    const chatsList = new ChatsList({
      chats
    })

    this.children.content = new ChatsLayout({
      content: [chatsList, chat]
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
