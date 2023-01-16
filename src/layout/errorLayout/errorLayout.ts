import template from './errorLayout.tmpl'
import ButtonInline from '../../components/buttonInline'
import Component from '../../core/component'

export interface ErrorLayoutProps {
  title: string
  description: string
}

export default class ErrorLayout extends Component<ErrorLayoutProps> {
  constructor(props: ErrorLayoutProps) {
    super(props)
  }

  init() {
    const buttonInline = new ButtonInline({
      label: 'Back to chats',
      linkTo: '/',
      isSmall: true
    })

    this.children = {
      ...this.children,
      buttonInline
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
