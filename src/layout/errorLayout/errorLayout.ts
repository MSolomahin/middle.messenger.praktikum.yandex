import template from './errorLayout.tmpl'
import Component from '../../core/component'
import Link from '../../ui/link'
import { ErrorLayoutProps } from './errorLayout.types'

export default class ErrorLayout extends Component<ErrorLayoutProps> {
  constructor(props: ErrorLayoutProps) {
    super({
      ...props,
      attrs: {
        class: 'error-layout__container'
      }
    })
  }

  init() {
    const link = new Link({
      label: 'Back to chats',
      linkTo: '/',
      isSmall: true
    })

    this.children = {
      ...this.children,
      link
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
