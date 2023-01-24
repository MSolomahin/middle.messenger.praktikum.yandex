import { ComponentBaseProps } from '../../core/component/component.types'

export interface UserSettingsProps extends ComponentBaseProps {
  onSubmit: ({ type, data }: { type: string, data: FormData }) => void
}
