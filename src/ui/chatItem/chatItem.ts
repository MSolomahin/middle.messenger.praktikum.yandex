import template from './chatItem.tmpl'
import { ChatItemProps } from './chatItem.types'
import Component from '../../core/component'
import Avatar from '../avatar'
import './chatItem.style.css'

export default class ChatItem extends Component<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      withLabel: props.chat.unread_count !== 0 ? 'chat-item__label_show' : '',
      attrs: {
        class: 'chat-item'
      }
    })
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'middle',
      src: this.props.chat.avatar || this.props.chat.last_message.user.avatar
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
