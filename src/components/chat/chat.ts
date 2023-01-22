import template from './chat.tmpl'
import Component from '../../core/component'
import MoreButton from '../moreButton/moreButton'
import Avatar from '../avatar/avatar'
import ArrowButton from '../arrowButton/arrowButton'
import MessageImage from '../messageImage'
import MessageText from '../messageText/messageText'
import MessageFile from '../messageFile/messageFile'
import AttachmentButton from '../attachmentButton/attachmentButton'
import { messagesMock } from '../../assets/mocks/messages'

export default class Chat extends Component {
  constructor() {
    super({
      attrs: {
        class: 'chat'
      }
    })
  }

  protected componentDidMount() {
    const form = this.element?.querySelector('.js-message-input')
    form?.addEventListener('submit', this._handleSubmit)
  }

  private readonly _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
  }

  init() {
    this.children.moreButton = new MoreButton()
    this.children.avatar = new Avatar({
      size: 'tiny'
    })
    this.children.arrowButton = new ArrowButton({
      side: 'right'
    })
    this.children.attachmentButton = new AttachmentButton({})

    this.children.image = new MessageImage({
      image:
      messagesMock.image1,
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
      image:
      messagesMock.image2
    })
    this.children.image2 = new MessageImage({
      image: messagesMock.image3
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
