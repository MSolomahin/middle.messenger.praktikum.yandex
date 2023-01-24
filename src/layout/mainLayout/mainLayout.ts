import template from './mainLayout.tmpl'
import Component from '../../core/component'
import { MainLayoutProps } from './mainLayout.types'
import './mainLayout.style.css'

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
    return this.compile({ ...this.props }, template)
  }
}
