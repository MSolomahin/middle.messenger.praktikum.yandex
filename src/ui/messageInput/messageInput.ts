import template from './messageInput.tmpl'
import { MessageInputProps } from './messageInput.types'
import Component from '../../core/component'
import './messageInput.style.css'

export default class MessageInput extends Component<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super({
      ...props,
      attrs: {
        class: 'message-input'
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
