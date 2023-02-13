import { ComponentBaseProps } from '../../core/component/component.types'
import { SecondDisabledEnum } from '../../ui/secondInput/secondInput.types'
import Validator from '../../utils/validator'

export interface SettingMainFormProps extends ComponentBaseProps {
  validator: Validator
  disabled?: SecondDisabledEnum
  editable?: boolean
  data?: {
    id: number
    display_name: string
    email: string
    first_name: string
    login: string
    phone: string
    second_name: string
  }
  onChangeInfo: () => void
  onChangePassword: () => void
  handleLogOut: (e: Event) => void
}
