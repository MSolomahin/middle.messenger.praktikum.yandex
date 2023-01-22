import template from './moreButton.tmpl'
import Component from '../../core/component'
import { MoreButtonProps } from './moreButton.types'
import DropDown from '../dropDown'
import DeleteIcon from '../../assets/icons/delete.svg'
import PlusIcon from '../../assets/icons/plus.svg'

export default class MoreButton extends Component<MoreButtonProps> {
  constructor() {
    super({
      attrs: {
        class: 'more-button'
      }
    })
  }

  protected componentDidMount() {
    const element = this.getContent()

    element?.addEventListener('click', this._handleItemClick)
  }

  private readonly _handleItemClick = () => {
    if (!(this.children.dropDown instanceof Component)) return
    const dropDown = this.children.dropDown.getContent()
    if (dropDown?.style.display === 'none') {
      this.children.dropDown.show()
    } else {
      this.children.dropDown.hide()
    }
  }

  init() {
    this.children.dropDown = new DropDown({
      position: 'bottom',
      align: 'left',
      items: [{
        image: PlusIcon,
        title: 'Add user'
      },
      {
        image: DeleteIcon,
        title: 'Delete user'
      }
    ]
    })
    this.children.dropDown.hide()
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
