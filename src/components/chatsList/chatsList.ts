import Component from '../../core/component'
import template from './chatsList.tmpl'
import { ChatsListProps } from './chatsList.types'
import './chatsList.style.css'
import { IChat, chats } from '../../assets/mocks/messages'
import ChatItem from '../../ui/chatItem'
import Avatar from '../../ui/avatar'

export default class ChatsList extends Component<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({
        ...props,
      attrs: {
        class: 'chats'
      }
    })
  }

  init() {
    this.children.avatar = new Avatar({
        size: 'tiny'
      })
    this.children.chatList = this.createChats(chats)
  }

  private createChats(props: IChat[]) {
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
    return this.compile({ ...this.props }, template)
  }
}
