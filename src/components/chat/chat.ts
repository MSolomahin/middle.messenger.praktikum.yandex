import template from './chat.tmpl'
import Component from '../../core/component'
import MoreButton from '../../ui/moreButton/moreButton'
import Avatar from '../../ui/avatar/avatar'
import ArrowButton from '../../ui/arrowButton/arrowButton'
import MessageFile from '../../ui/messageFile/messageFile'
import AttachmentButton from '../../ui/attachmentButton/attachmentButton'
import { messagesMock } from '../../assets/mocks/messages'
import MessageImage from '../../ui/messageImage'
import MessageText from '../../ui/messageText'
import DropDown from '../../ui/dropDown/dropDown'
import DocumentIcon from '../../assets/icons/document.svg'
import LocationIcon from '../../assets/icons/location.svg'
import PhotoIcon from '../../assets/icons/photo.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import PlusIcon from '../../assets/icons/plus.svg'
import './chat.style.css'
import MessageInput from '../../ui/messageInput/messageInput'

export default class Chat extends Component {
  constructor() {
    super({
      attrs: {
        class: 'chat'
      }
    })
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        submit: this._handleSubmit
      }
    })
  }

  private readonly _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const target = (e.target as HTMLElement).closest('form')
    if (!target) return

    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }

    target.reset()
  }

  private _onItemClick(e: MouseEvent) {
    e.stopPropagation()
    console.log('item click')
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'tiny'
    })
    this.children.arrowButton = new ArrowButton({
      side: 'right'
    })

    this.children.messageInput = new MessageInput({
      placeholder: 'Write a message',
      name: 'message'
    })

    this.children.moreButton = new DropDown({
      position: 'bottom',
      align: 'left',
      items: [
        {
          image: PlusIcon,
          title: 'Add user',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: DeleteIcon,
          title: 'Delete user',
          onClick: this._onItemClick.bind(this)
        }
      ],
      button: new MoreButton()
    })

    this.children.attachmentButton = new DropDown({
      position: 'top',
      align: 'right',
      items: [
        {
          image: PhotoIcon,
          title: 'Photo and video',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: DocumentIcon,
          title: 'File',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: LocationIcon,
          title: 'Location',
          onClick: this._onItemClick.bind(this)
        }
      ],
      button: new AttachmentButton()
    })

    this.children.image = new MessageImage({
      image: messagesMock.image1,
      isMy: true
    })
    this.children.text = new MessageText({
      text: messagesMock.text
    })
    this.children.file = new MessageFile({
      file: messagesMock.file,
      name: 'Pictures.png',
      isMy: true
    })
    this.children.image1 = new MessageImage({
      image: messagesMock.image2
    })
    this.children.image2 = new MessageImage({
      image: messagesMock.image3
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
