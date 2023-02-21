import { ComponentBaseProps } from '../../core/component/component.types'

export interface BaseInputProps extends ComponentBaseProps {
  label: string
  name: string
  type?: string
  value?: string
  required?: boolean
  errorMessage?: string
  pattern?: RegExp
  validate?: (name: string) => string
}
