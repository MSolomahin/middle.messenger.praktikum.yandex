import template from './mainLayout.tmpl'
import Component from '../../core/component'
import { MainLayoutProps } from './mainLayout.types'

export default class MainLayout extends Component<MainLayoutProps> {
  constructor(props: MainLayoutProps) {
    super({
      ...props,
      attrs: {
        class: 'main-layout'
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
