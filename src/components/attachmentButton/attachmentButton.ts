import template from './attachmentButton.tmpl'
import { AttachmentButtonProps } from './attachmentButton.types'
import Component from '../../core/component'
import DropDown from '../dropDown/dropDown'
import DocumentIcon from '../../assets/icons/document.svg'
import LocationIcon from '../../assets/icons/location.svg'
import PhotoIcon from '../../assets/icons/photo.svg'

export default class AttachmentButton extends Component<AttachmentButtonProps> {
  constructor(props: AttachmentButtonProps) {
    super({
      ...props,
      attrs: {
        class: 'attachment-button'
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
      position: 'top',
      align: 'right',
      items: [{
        image: PhotoIcon,
        title: 'Photo and video'
      },
      {
        image: DocumentIcon,
        title: 'File'
      },
      {
        image: LocationIcon,
        title: 'Location'
      }
    ]
    })
    this.children.dropDown.hide()
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
