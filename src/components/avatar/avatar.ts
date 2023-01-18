import template from './avatar.tmpl'
import { AvatarEditable, AvatarProps } from './avatar.types'
import Component from '../../core/component'

export default class Avatar extends Component<AvatarProps> {
  fileInput: HTMLInputElement | null

  constructor(props: AvatarProps) {
    const { isEditable = AvatarEditable.false, size, src = '' } = props
    super({
      isEditable,
      size,
      src
    })
    this.fileInput = null
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
