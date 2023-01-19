import { ComponentBaseProps } from '../../core/component/component.types'

export interface AvatarProps extends ComponentBaseProps {
  size: string
  isEditable?: true
  src?: string
}
