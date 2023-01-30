import template from './dropDown.tmpl'
import { DropDownProps } from './dropDown.types'
import Component from '../../core/component'
import DropDownItem from '../dropDownItem/dropDownItem'
import './dropDown.style.css'

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

  private _getItemList(items: DropDownProps['items']) {
    return items.map((item) => {
      const { image, title, onClick } = item
      return new DropDownItem({
        title,
        image,
        events: {
          click: onClick
        }
      })
    })
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        click: this._handleItemClick
      }
    })
  }

  private readonly _handleItemClick = (e: MouseEvent) => {
    e.stopPropagation()
    const dropDown = this.getContent()?.children[1] as HTMLElement
    if (!dropDown) return

    dropDown.style.display =
      dropDown?.style.display === 'block' ? 'none' : 'block'
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
