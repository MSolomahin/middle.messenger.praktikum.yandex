import template from './avatar.tmpl'
import { AvatarProps } from './avatar.types'
import Component from '../../core/component'
import './avatar.style.css'

export default class Avatar extends Component<AvatarProps> {
  fileInput: HTMLInputElement | null

  constructor(props: AvatarProps) {
    super({
      ...props,
      attrs: {
        class: `avatar__container avatar__container_${props.size}`
      }
    })
    this.fileInput = null
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        change: this._uploadAvatar
      }
    })
  }

  private readonly _uploadAvatar = (e: InputEvent) => {
    const input = e.target as HTMLInputElement
    const file = input?.files?.[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      if (this.element && typeof reader.result === 'string') {
        this.element.style.background = `url(${reader.result}) no-repeat center center / cover`
      }
    }

    if (file != null) {
      reader.readAsDataURL(file)
    }
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
