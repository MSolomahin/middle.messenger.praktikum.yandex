import template from './moreButton.tmpl'
import Component from '../../core/component'
import { MoreButtonProps } from './moreButton.types'
import './moreButton.style.css'

export default class MoreButton extends Component<MoreButtonProps> {
  constructor() {
    super({
      attrs: {
        class: 'more-button'
      }
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
