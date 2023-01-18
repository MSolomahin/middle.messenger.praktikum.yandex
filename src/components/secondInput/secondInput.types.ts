export interface SecondInputProps {
  label: string
  value: string
  name: string
  type?: string
  disabled?: InputDisabled
}

export enum InputDisabled {
  true = 'disabled',
  false = ''
}
