import template from './avatar.tmpl'
import { AvatarProps } from './avatar.types'
import Component from '../../core/component'
import './avatar.style.scss'
import { getFilePath } from '../../utils/getFilePath'

export default class Avatar extends Component<AvatarProps> {
  fileInput: HTMLInputElement | null

  constructor(props: AvatarProps) {
    super({
      ...props,
      src: getFilePath(props.src),
      attrs: {
        class: `avatar__container avatar__container_${props.size}`
      }
    }, 'form')
    this.fileInput = null
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        change: this._uploadAvatar
      }
    })
  }

  private readonly _uploadAvatar = () => {
    const form = this.getContent() as HTMLFormElement
    const formData = new FormData(form)

    if (this.props.handleUpload) {
      this.props.handleUpload(formData)
    }
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
