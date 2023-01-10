import template from './avatar.tmpl'
import { AvatarProps } from './avatar.types'
import Component from '../../core/component/component'

export default class Avatar extends Component {
  fileInput: HTMLInputElement | null

  constructor (props: AvatarProps) {
    super('div', props)
    this.fileInput = null
    this.eventBus?.().emit(Avatar.EVENTS.INIT)
  }

  // initEventListeners = () => {
  //   this.fileInput = this.element.querySelector("input[type='file']") as HTMLInputElement
  //   this.fileInput?.addEventListener('change', this.uploadAvatar)
  // }

  override render = (): DocumentFragment => {
    return this.compile(template, { ...this.props })
  }

  uploadAvatar = () => {
    const avatar = this.element
    const file = this.fileInput?.files?.[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      if (avatar != null && typeof reader.result === 'string') {
        (avatar as HTMLDivElement).style.background = `url(${reader.result}) no-repeat center center / cover`
      }
    }

    if (file != null) {
      reader.readAsDataURL(file)
    }
  }
}
