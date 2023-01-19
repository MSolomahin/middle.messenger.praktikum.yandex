import { ComponentBaseProps } from '../../core/component/component.types'

export interface BaseInputProps extends ComponentBaseProps {
  label: string
  type?: string
  name?: string
}
