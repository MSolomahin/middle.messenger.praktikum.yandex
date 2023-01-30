import template from './messageText.tmpl'
import { MessageTextProps } from './messageText.types'
import Component from '../../core/component'
import './messageText.style.css'

export default class MessageText extends Component<MessageTextProps> {
  constructor(props: MessageTextProps) {
    super({
      ...props,
      attrs: {
        class: `message-text ${props.isMy ? 'message-text_is-my' : ''}`
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
