import template from './search.tmpl'
import Component from '../../core/component'
import './search.style.css'
import { SearchProps } from './search.types'
import ArrowButton from '../arrowButton/arrowButton'

export default class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super({
      ...props,
      attrs: {
        class: 'search'
      }
    }, 'form')
  }

  init() {
    this.children.button = new ArrowButton({
      side: 'right',
      type: 'submit'
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
