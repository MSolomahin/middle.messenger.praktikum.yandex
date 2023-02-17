import { ComponentBaseProps } from '../../core/component/component.types'
import { IUser } from '../../store/types'
import Validator from '../../utils/validator'

export interface SettingMainFormProps extends ComponentBaseProps {
  validator: Validator
  disabled?: boolean
  editable?: boolean
  user: IUser | null
  onChangeInfo: () => void
  onChangePassword: () => void
  handleLogOut: (e: Event) => void
}
