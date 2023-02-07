import { chats } from '../../../assets/mocks/messages'
import Chat from '../../../components/chat'
import ChatsList from '../../../components/chatsList'
import Component from '../../../core/component'
import './messenger.style.css'

export class Messenger extends Component {
  constructor() {
    super({
      attrs: {
        class: 'chats-layout'
      }
    })
  }

  init() {
    const chat = new Chat()
    const chatsList = new ChatsList({
      chats
    })

    this.children.content = [chatsList, chat]
  }

  render() {
    return this.compile({ ...this.props })
  }
}
