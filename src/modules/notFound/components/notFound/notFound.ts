import routes from '../../../../assets/const/routing'
import Component from '../../../../core/component'
import ErrorTemplate from '../../../../ui/errorTemplate/errorTemplate'

export class NotFound extends Component {
  init() {
    this.children.content = new ErrorTemplate({
      title: '404',
      description: 'Page not found',
      linkPath: routes.messenger
    })
  }

  render() {
    return this.compile({ ...this.props })
  }
}
