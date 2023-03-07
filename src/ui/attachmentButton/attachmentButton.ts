import template from './attachmentButton.tmpl'
import { AttachmentButtonProps } from './attachmentButton.types'
import Component from '../../core/component'
import './attachmentButton.style.scss'
import AttachmentIcon from '../../assets/icons/clip.svg'

export default class AttachmentButton extends Component<AttachmentButtonProps> {
  constructor() {
    super({
      image: AttachmentIcon,
      attrs: {
        class: 'attachment-button'
      }
    })
  }

  override render() {
    return this.compile({ ...this.props }, template)
  }
}
