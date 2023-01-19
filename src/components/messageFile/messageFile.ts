import template from './messageFile.tmpl'
import { MessageFileProps } from './messageFile.types'
import Component from '../../core/component'

export default class MessageFile extends Component<MessageFileProps> {
  constructor(props: MessageFileProps) {
    super({
      ...props,
      attrs: {
        class: 'message-file'
      }
    })
  }

  init() {}

  override render() {
    return this.compile(template, { ...this.props })
  }
}
