import template from './link.tmpl'
import Component from '../../core/component'
import ButtonInline from '../buttonInline/buttonInline'
import { LinkProps } from './link.types'

export default class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      attrs: {
        href: props.linkTo
      }
    }, 'a')
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
