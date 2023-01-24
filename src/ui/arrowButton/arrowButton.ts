import template from './arrowButton.tmpl'
import {
  ArrowButtonProps
} from './arrowButton.types'
import Component from '../../core/component'
import './arrowButton.style.css'

export default class ArrowButton extends Component<ArrowButtonProps> {
  constructor(props: ArrowButtonProps) {
    super({
      ...props,
      tag: props.link ? 'a' : 'button',
      type: props.link ? '' : 'submit',
      attrs: {
        class: `arrow-button ${props.side === 'right' ? 'arrow-button_right' : ''}`
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
