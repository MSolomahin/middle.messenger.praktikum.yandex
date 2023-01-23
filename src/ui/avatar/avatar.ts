import template from './avatar.tmpl'
import { AvatarProps } from './avatar.types'
import Component from '../../core/component'

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

  override render() {
    return this.compile(template, { ...this.props })
  }
}
