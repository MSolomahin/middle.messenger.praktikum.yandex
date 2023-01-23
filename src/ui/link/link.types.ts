import { ComponentBaseProps } from '../../core/component/component.types'

export interface LinkProps extends ComponentBaseProps {
  label: string
  linkTo: string
  isSmall?: boolean
  isRed?: boolean
}
