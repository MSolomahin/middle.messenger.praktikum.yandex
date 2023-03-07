import template from './emptyChat.tmpl'
import Component from '../../core/component'
import './emptyChat.style.scss'

export default class EmptyChat extends Component {
  constructor() {
    super({
      attrs: {
        class: 'empty-chat'
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
