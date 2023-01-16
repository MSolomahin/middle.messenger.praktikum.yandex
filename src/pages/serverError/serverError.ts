import ErrorLayout from '../../layout/errorLayout'
import Component from '../../core/component/'
import template from './serverError.tmpl'

export default class ServerErrorPage extends Component {
  constructor() {
    super({})
  }

  init() {
    this.children.errorLayout = new ErrorLayout({
      title: '500',
      description: "We've already started fixing it."
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
