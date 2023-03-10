import template from './chatItem.tmpl'
import { ChatItemProps } from './chatItem.types'
import Component from '../../core/component'
import Avatar from '../avatar'
import './chatItem.style.scss'

export default class ChatItem extends Component<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      attrs: {
        class: 'chat-item'
      }
    })
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'middle',
      src: this.props.chat.avatar
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
