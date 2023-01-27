import Component from '../../core/component'
import { ChatsLayoutProps } from './chatsLayout.types'
import './chatsLayout.style.css'

export default class ChatsLayout extends Component<ChatsLayoutProps> {
  constructor(props: ChatsLayoutProps) {
    super({
      ...props,
      attrs: {
        class: 'chats-layout'
      }
    })
  }

  init() {
    this.children.content = this.props.content
  }

  render() {
    return this.compile({ ...this.props })
  }
}
