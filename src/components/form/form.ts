import template from './form.tmpl'
import Component from '../../core/component'
import { FromProps } from './form.types'
import Link from '../../ui/link'
import ButtonPrimary from '../../ui/buttonPrimary'
import './form.style.css'

export default class Form extends Component<FromProps> {
  constructor(props: FromProps) {
    const { disable = false } = props
    super({
      ...props,
      disable,
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
    return this.compile({ ...this.props }, template)
  }
}
