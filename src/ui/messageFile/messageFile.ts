import template from './messageFile.tmpl'
import { MessageFileProps } from './messageFile.types'
import Component from '../../core/component'
import './messageFile.style.css'

export default class MessageFile extends Component<MessageFileProps> {
  constructor(props: MessageFileProps) {
    super({
      ...props,
      attrs: {
        class: `message-file ${props.isMy ? 'message-file_is-my' : ''}`
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
