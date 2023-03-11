import { ComponentBaseProps } from '../../core/component/component.types'

export interface ArrowButtonProps extends ComponentBaseProps {
  link?: string
  tag?: string
  type?: string
  side: string
  image?: string
}
