import Component from '../../../../core/component'
import ErrorTemplate from '../../../../ui/errorTemplate/errorTemplate'

export class ServerError extends Component {
  init() {
    this.children.content = new ErrorTemplate({
      title: '500',
      description: 'We\'ve already started fixing it.',
      linkPath: '/'
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
