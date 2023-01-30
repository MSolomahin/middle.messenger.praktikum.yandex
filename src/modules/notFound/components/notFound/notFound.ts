import Component from '../../../../core/component'
import ErrorTemplate from '../../../../ui/errorTemplate/errorTemplate'

export class NotFound extends Component {
  init() {
    this.children.content = new ErrorTemplate({
      title: '404',
      description: 'Page not found',
      linkPath: '/'
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
