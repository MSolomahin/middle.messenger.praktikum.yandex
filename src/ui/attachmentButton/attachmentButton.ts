import template from './attachmentButton.tmpl'
import { AttachmentButtonProps } from './attachmentButton.types'
import Component from '../../core/component'

export default class AttachmentButton extends Component<AttachmentButtonProps> {
  constructor() {
    super({
      attrs: {
        class: 'attachment-button'
      }
    })
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
