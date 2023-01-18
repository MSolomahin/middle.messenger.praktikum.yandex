import template from './chat.tmpl'
import { ChatProps } from './chat.types'
import Component from '../../core/component'
import MoreButton from '../moreButton/moreButton'
import Avatar from '../avatar/avatar'
import ArrowButton from '../arrowButton/arrowButton'
import MessageImage from '../messageImage'
import MessageText from '../messageText/messageText'
import MessageFile from '../messageFile/messageFile'

export default class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super(props)
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

    this.children.image = new MessageImage({
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'
    })
    this.children.text = new MessageText({
      text:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg sdc sdcsd csdc  sdc sdcsd cdsckjjsdnckjsjncladjnvcldf sadcuhdc sch sadocsdocu sadcsadcush '
    })
    this.children.file = new MessageFile({
      file:
        'http://localhost:1234/clip.a5692064.svg',
        name: 'Pictures.png'
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
