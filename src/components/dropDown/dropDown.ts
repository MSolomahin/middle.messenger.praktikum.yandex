import template from './dropDown.tmpl'
import { DropDownProps } from './dropDown.types'
import Component from '../../core/component'
import DropDownItem from '../dropDownItem/dropDownItem'

export default class DropDown extends Component<DropDownProps> {
  constructor(props: DropDownProps) {
    super({
      ...props,
      attrs: {
        class: 'drop-down'
      }
    })
  }

  init() {
    this.children.itemsList = this._getItemList(this.props.items)
  }

  private _getItemList (items: DropDownProps['items']) {
    return items.map((item) => {
      return new DropDownItem({
        ...item,
        events: {
          click: (e: Event) => {
            e.stopPropagation()
            console.log('click')
          }
        }
      })
    })
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
