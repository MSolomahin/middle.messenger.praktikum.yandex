import template from './messageText.tmpl'
import { MessageTextProps } from './messageText.types'
import Component from '../../core/component'

export default class MessageText extends Component<MessageTextProps> {
  constructor (props: MessageTextProps) {
    super(props)
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
