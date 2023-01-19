import template from './authLayout.tmpl'
import Component from '../../core/component'
import ButtonPrimary from '../../components/buttonPrimary'
import Link from '../../components/link/link'
import { AuthLayoutProps } from './authLayout.types'

export default class AuthLayout extends Component<AuthLayoutProps> {
  constructor(props: AuthLayoutProps) {
    super({
      ...props,
      attrs: {
        class: 'auth-layout__container'
      }
    })
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
