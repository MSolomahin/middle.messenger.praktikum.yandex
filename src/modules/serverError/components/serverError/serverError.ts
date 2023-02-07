import routes from '../../../../assets/const/routing'
import Component from '../../../../core/component'
import ErrorTemplate from '../../../../ui/errorTemplate/errorTemplate'

export class ServerError extends Component {
  init() {
    this.children.content = new ErrorTemplate({
      title: '500',
      description: 'We\'ve already started fixing it.',
      linkPath: routes.messenger
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
