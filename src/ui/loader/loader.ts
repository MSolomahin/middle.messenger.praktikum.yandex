import template from './loader.tmpl'
import Component from '../../core/component'
import { LoaderProps } from './loader.types'
import './loader.style.css'

export default class Loader extends Component<LoaderProps> {
  constructor(props: LoaderProps) {
    super({
      ...props,
      attrs: {
        class: 'loader'
      }
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
