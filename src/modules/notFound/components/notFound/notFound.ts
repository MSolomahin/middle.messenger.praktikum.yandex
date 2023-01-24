import Component from '../../../../core/component'
import ErrorTemplate from '../../../../ui/errorTemplate/errorTemplate'
import template from './notFound.tmpl'

export class NotFound extends Component {
  init() {
    this.children.errorTemplate = new ErrorTemplate({
      title: '404',
      description: 'Page not found',
      linkPath: '/'
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
