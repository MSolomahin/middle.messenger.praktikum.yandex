import { ComponentBaseProps } from '../../core/component/component.types'

export interface SecondInputProps extends ComponentBaseProps {
  label: string
  name: string
  value?: string
  type?: string
  errorMessage?: string
  disabled?: boolean
  validate?: (name: string) => string
}
