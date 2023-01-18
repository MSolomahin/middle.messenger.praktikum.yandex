import template from './arrowButton.tmpl'
import { ArrowButtonProps } from './arrowButton.types'
import Component from '../../core/component'

export default class ArrowButton extends Component<
  ArrowButtonProps & { tag: string, type: string }
> {
  constructor(props: ArrowButtonProps) {
    const { link = '', side = 'left' } = props
    super({
      link,
      side: side === 'right' ? 'arrow-button_right' : '',
      tag: link ? 'a' : 'button',
      type: link ? '' : 'submit'
    })
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
