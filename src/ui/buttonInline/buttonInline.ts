import template from './buttonInline.tmpl'
import { ButtonInlineProps } from './buttonInline.types'
import Component from '../../core/component'
import './buttonInline.style.css'

export default class ButtonInline extends Component<
ButtonInlineProps
> {
  constructor(props: ButtonInlineProps) {
    super(
      {
        ...props,
        attrs: {
          ...props.attrs,
          class: `button-inline${props.isSmall ? ' button-inline_small' : ''}${
            props.isRed ? ' button-inline_red' : ''
          }`
        }
      },
      'button'
    )
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
