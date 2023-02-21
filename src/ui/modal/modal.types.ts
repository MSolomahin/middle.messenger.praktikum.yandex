import Component from '../../core/component/component'
import { ComponentBaseProps } from '../../core/component/component.types'

export interface ModalProps extends ComponentBaseProps {
  title: string
  id?: string
  buttonTitle: string
  children: Component | Component[]
}
