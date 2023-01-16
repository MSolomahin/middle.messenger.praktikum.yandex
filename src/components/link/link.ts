import template from './link.tmpl'
import Component from '../../core/component'
import ButtonInline from '../buttonInline/buttonInline'
import { LinkProps } from './link.types'

export default class Link extends Component<LinkProps & { className: string }> {
  constructor(props: LinkProps) {
    super({
      ...props,
      className: `button-inline${props.isSmall ? ' button-inline_small' : ''}${
        props.isRed ? ' button-inline_red' : ''
      }`
    })
  }

  init() {
    this.children.button = new ButtonInline({
      ...this.props
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
