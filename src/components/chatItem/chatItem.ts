import template from './chatItem.tmpl'
import { ChatItemProps } from './chatItem.types'
import Component from '../../core/component/component'

export default class ChatItem extends Component {
  constructor (props: ChatItemProps) {
    super('div', props)
    this.eventBus?.().emit(ChatItem.EVENTS.INIT)
  }

  override render: () => DocumentFragment = () => {
    return this.compile(template, { ...this.props })
  }
}
