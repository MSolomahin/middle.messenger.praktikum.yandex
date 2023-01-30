import template from './messageImage.tmpl'
import { MessageImageProps } from './messageImage.types'
import Component from '../../core/component'
import './messageImage.style.css'

export default class MessageImage extends Component<MessageImageProps> {
  constructor(props: MessageImageProps) {
    super({
      ...props,
      attrs: {
        class: `message-image ${props.isMy ? 'message-image_is-my' : ''}`
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
