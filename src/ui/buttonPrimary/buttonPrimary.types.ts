import { ComponentBaseProps } from '../../core/component/component.types'

export interface ButtonPrimaryProps extends ComponentBaseProps {
  label: string
  type?: string
  disable?: boolean
}
