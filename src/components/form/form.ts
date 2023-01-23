import template from './form.tmpl'
import Component from '../../core/component'
import { FromProps } from './form.types'
import Link from '../../ui/link'
import ButtonPrimary from '../../ui/buttonPrimary'

export default class Form extends Component<FromProps> {
  constructor(props: FromProps) {
    super({
      ...props,
      attrs: {
        class: 'form'
      }
    })
  }

  init() {
    const link = new Link({
      label: this.props.linkText,
      linkTo: this.props.linkPath,
      isSmall: true
    })

    const buttonPrimary = new ButtonPrimary({
      label: this.props.buttonText,
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
