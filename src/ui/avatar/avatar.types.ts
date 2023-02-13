import { ComponentBaseProps } from '../../core/component/component.types'

export interface AvatarProps extends ComponentBaseProps{
  size: string
  isEditable?: AvatarEditable
  src?: string
  showImg?: string
  handleUpload?: (img?: FormData) => void
}

export enum AvatarEditable {
  true = 'avatar_editable',
  false = ''
}
