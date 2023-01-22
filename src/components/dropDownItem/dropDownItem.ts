import template from './dropDownItem.tmpl'
import { DropDownItemProps } from './dropDownItem.types'
import Component from '../../core/component'

export default class DropDownItem extends Component<DropDownItemProps> {
  constructor(props: DropDownItemProps) {
    super({
      ...props,
      attrs: {
        class: 'drop-down-item'
      }
    })
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
