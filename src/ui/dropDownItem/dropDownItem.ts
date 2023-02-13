import template from './dropDownItem.tmpl'
import { DropDownItemProps } from './dropDownItem.types'
import Component from '../../core/component'
import './dropDownItem.style.css'

export default class DropDownItem extends Component<DropDownItemProps> {
  constructor(props: DropDownItemProps) {
    super({
      ...props,
      attrs: {
        class: 'drop-down-item',
        id: props.id
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
