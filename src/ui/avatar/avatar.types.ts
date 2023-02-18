import { ComponentBaseProps } from '../../core/component/component.types'

export interface AvatarProps extends ComponentBaseProps{
  size: string
  isEditable?: boolean
  src?: string
  handleUpload?: (img?: FormData) => void
}
