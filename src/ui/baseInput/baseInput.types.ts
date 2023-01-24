import { ComponentBaseProps } from '../../core/component/component.types'

export interface BaseInputProps extends ComponentBaseProps {
  label: string
  type?: string
  name?: string
  required?: boolean
  error?: string
  isError?: string
  validateScheme?: (name: string, value: string) => boolean
}
