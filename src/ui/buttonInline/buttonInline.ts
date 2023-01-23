import template from './buttonInline.tmpl'
import { ButtonInlineProps } from './buttonInline.types'
import Component from '../../core/component'

export default class ButtonInline extends Component<
ButtonInlineProps
> {
  constructor(props: ButtonInlineProps) {
    super(
      {
        ...props,
        attrs: {
          class: `button-inline${props.isSmall ? ' button-inline_small' : ''}${
            props.isRed ? ' button-inline_red' : ''
          }`
        }
      },
      'button'
    )
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
