import { ComponentBaseProps } from '../../core/component/component.types'

export interface ButtonInlineProps extends ComponentBaseProps {
  label: string
  isRed?: boolean
  isSmall?: boolean
  // linkTo: string
}
