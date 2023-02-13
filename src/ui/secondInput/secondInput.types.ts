import { ComponentBaseProps } from '../../core/component/component.types'

export interface SecondInputProps extends ComponentBaseProps {
  label: string
  name: string
  value?: string
  type?: string
  errorMessage?: string
  isError?: SecondInputError
  disabled?: SecondDisabledEnum
  validate?: (name: string) => string
}

export enum SecondDisabledEnum {
  true = 'disabled',
  false = ''
}

export enum SecondInputError {
  true = 'second-input__error_active',
  false = ''
}
