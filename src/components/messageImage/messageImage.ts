import template from './messageImage.tmpl'
import { MessageImageProps } from './messageImage.types'
import Component from '../../core/component'

export default class MessageImage extends Component<MessageImageProps> {
  constructor(props: MessageImageProps) {
    super({
      ...props,
      attrs: {
        class: 'message-image'
      }
    })
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
