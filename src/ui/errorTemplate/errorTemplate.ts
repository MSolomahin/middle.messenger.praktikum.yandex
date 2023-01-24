import template from './errorTemplate.tmpl'
import Component from '../../core/component'
import { ErrorTemplateProps } from './errorTemplate.types'
import Link from '../link'
import './errorTemplate.style.css'

export default class ErrorTemplate extends Component<ErrorTemplateProps> {
  constructor(props: ErrorTemplateProps) {
    super({
      ...props,
      attrs: {
        class: 'not-found'
      }
    })
  }

  init() {
    this.children.link = new Link({
        label: 'Back to chats',
        linkTo: this.props.linkPath,
        isSmall: true
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
