import template from './moreButton.tmpl'
import Component from '../../core/component'

export default class MoreButton extends Component {
  render() {
    return this.compile(template, { ...this.props })
  }
}
