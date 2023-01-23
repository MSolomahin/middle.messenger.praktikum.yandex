import template from './moreButton.tmpl'
import Component from '../../core/component'
import { MoreButtonProps } from './moreButton.types'

export default class MoreButton extends Component<MoreButtonProps> {
  constructor() {
    super({
      attrs: {
        class: 'more-button'
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
