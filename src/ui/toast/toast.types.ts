import { ComponentBaseProps } from '../../core/component/component.types'

export interface ToastProps extends ComponentBaseProps {
  type: 'error' | 'success'
}
