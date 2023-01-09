import Templator from '../../utils/templator'
import template from './avatar.tmpl'
import BaseComponent from '../../core/baseComponent'
import { AvatarProps } from './avatar.types'

export default class Avatar extends BaseComponent {
  fileInput: HTMLInputElement | null | undefined

  constructor (props: AvatarProps) {
    super()
    const { size, isEditable = false, src = '' } = props
    this.template = new Templator(template).compile({
      size,
      isEditable: isEditable ? 'avatar__container_editable' : '',
      src
    })
    this.fileInput = null
    this.render()
  }

  initEventListeners = () => {
    this.fileInput = this.element.querySelector("input[type='file']") as HTMLInputElement
    this.fileInput?.addEventListener('change', this.uploadAvatar)
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
