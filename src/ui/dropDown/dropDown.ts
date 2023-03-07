import template from './dropDown.tmpl'
import { DropDownProps } from './dropDown.types'
import Component from '../../core/component'
import DropDownItem from '../dropDownItem/dropDownItem'
import './dropDown.style.scss'

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
      const { image, title, onClick, id } = item
      return new DropDownItem({
        title,
        image,
        id,
        events: {
          click: (e: MouseEvent) => { this._handleToggleDropDown(e, onClick) }
        }
      })
    })
  }

  _handleToggleDropDown(e: MouseEvent, onClick: (e: MouseEvent) => void) {
    onClick(e)
    this._toggleDropDown()
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        click: this._handleItemClick
      }
    })
  }

  _toggleDropDown() {
    const dropDown = this.getContent()?.children[1] as HTMLElement
    if (!dropDown) return

    dropDown.style.display =
      dropDown?.style.display === 'block' ? 'none' : 'block'
  }

  private readonly _handleItemClick = (e: MouseEvent) => {
    e.stopPropagation()
    this._toggleDropDown()
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
