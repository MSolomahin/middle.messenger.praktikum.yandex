import ErrorLayout from '../../layout/errorLayout'
import Component from '../../core/component'
import template from './notFound.tmpl'

export default class NotFoundPage extends Component {
  init() {
    this.children.errorLayout = new ErrorLayout({
      title: '404',
      description: 'Page not found'
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
