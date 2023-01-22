import { ComponentBaseProps } from '../../core/component/component.types'

export interface DropDownProps extends ComponentBaseProps {
  position: 'bottom' | 'top'
  align: 'left' | 'right'
  items: Array<{
    image: string
    title: string
  }>
}
