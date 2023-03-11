import template from './backButtonLayout.tmpl'
import Component from '../../core/component'
import { BackButtonLayoutProps } from './backButtonLayout.types'
import ArrowButton from '../../ui/arrowButton/arrowButton'
import './backButtonLayout.style.scss'

export default class BackButtonLayout extends Component<BackButtonLayoutProps> {
  constructor(props: BackButtonLayoutProps) {
    super({
      ...props,
      attrs: {
        class: 'back-button-layout'
      }
    })
  }

  init() {
    this.children.arrowButton = new ArrowButton({
      side: 'left',
      link: this.props.linkPath
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
