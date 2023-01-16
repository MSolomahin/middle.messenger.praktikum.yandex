import template from './buttonInline.tmpl'
import { ButtonInlineProps } from './buttonInline.types'
import Component from '../../core/component'

export default class ButtonInline extends Component {
  constructor (props: ButtonInlineProps) {
    super({
      ...props,
      className: `button-inline${props.isSmall ? ' button-inline_small' : ''}${props.isRed ? ' button-inline_red' : ''}`,
      tag: props.linkTo ? 'a' : 'button'
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
