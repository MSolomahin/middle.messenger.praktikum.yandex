import { ComponentBaseProps } from '../../core/component/component.types'
import { IUser } from '../../modules/authorizationForm'
import { SecondDisabledEnum } from '../../ui/secondInput/secondInput.types'
import Validator from '../../utils/validator'

export interface SettingMainFormProps extends ComponentBaseProps {
  validator: Validator
  disabled?: SecondDisabledEnum
  editable?: boolean
  user?: IUser
  onChangeInfo: () => void
  onChangePassword: () => void
  handleLogOut: (e: Event) => void
}
