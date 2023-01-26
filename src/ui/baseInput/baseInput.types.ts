import { ComponentBaseProps } from '../../core/component/component.types'

export interface BaseInputProps extends ComponentBaseProps {
  label: string
  name: string
  type?: string
  value?: string
  required?: boolean
  errorMessage?: string
  isError?: InputError
  pattern?: RegExp
  validate?: (type: string, name: string) => string
}

export enum InputError {
  true = 'input-base__error_active',
  false = ''
}
