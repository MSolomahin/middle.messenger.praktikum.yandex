import template from './avatar.tmpl'
import { AvatarProps } from './avatar.types'
import Component from '../../core/component'

export default class Avatar extends Component<AvatarProps> {
  fileInput: HTMLInputElement | null

  constructor(props: AvatarProps) {
    super({
      ...props,
      isEditable: props.isEditable ? 'avatar__container_editable' : ''
    })
    this.fileInput = null
  }

  override render() {
    return this.compile(template, { ...this.props })
  }
}
