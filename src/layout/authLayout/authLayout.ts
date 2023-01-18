import template from './authLayout.tmpl'
import Component from '../../core/component'
import ButtonPrimary from '../../components/buttonPrimary'
import Link from '../../components/link/link'

export interface AuthLayoutProps {
  title: string
  primaryText: string
  inlineText: string
  inlineLink: string
  subComponents: Component[]
}

export default class AuthLayout extends Component<AuthLayoutProps> {
  constructor(props: AuthLayoutProps) {
    const { title, primaryText, inlineText, inlineLink, subComponents } = props
    super({ title, primaryText, inlineText, inlineLink, subComponents })
  }

  init() {
    const link = new Link({
      label: this.props.inlineText,
      linkTo: this.props.inlineLink,
      isSmall: true
    })

    const buttonPrimary = new ButtonPrimary({
      label: this.props.primaryText,
      type: 'submit'
    })

    this.children = {
      ...this.children,
      link,
      buttonPrimary,
      subComponents: this.props.subComponents
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
