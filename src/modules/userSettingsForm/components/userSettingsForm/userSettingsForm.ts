import ChangePasswordForm from '../../../../components/changePasswordForm'
import SettingMainForm from '../../../../components/settingMainForm'
import Component from '../../../../core/component'
import Avatar from '../../../../ui/avatar'
import { AvatarEditable } from '../../../../ui/avatar/avatar.types'
import { SecondDisabledEnum } from '../../../../ui/secondInput/secondInput.types'
import Validator from '../../../../utils/validator'
import template from './userSettingsForm.tmpl'
import './userSettingsForm.style.css'
import SettingsController from '../../controllers/settingsController'
import { withStore } from '../../../../core/store/connect'
import store, { StoreEvents } from '../../../../core/store'

class UserSettingsFormModule extends Component {
  constructor(props: any) {
    super({
      validator: new Validator(),
      ...props
    })
  }

  override componentDidMount() {
    this.setProps({
      events: {
        submit: this._handleSubmit.bind(this)
      }
    })
  }

  private _handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement | null
    if (!target) return

    const formData = new FormData(target)
    const allIsValid = this.props.validator.checkForm(formData)
    const button = e.submitter
    const data = this._getObjectFromFormData(formData) as Record<string, string>

    if (!allIsValid) return

    if (button?.id === 'button-settings') {
      this._handleSubmitSettings(data)
    } else {
      this._handleSubmitPassword(data)
    }
  }

  _handleSubmitPassword(data: Record<string, string>) {
    SettingsController.updatePassword({
      oldPassword: data.old_password,
      newPassword: data.new_password
    })
    this._toggleChangePassword()
  }

  _handleSubmitSettings(data: Record<string, string>) {
    SettingsController.updateSettings({
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone
    })
    this._toggleChangeInfo()
  }

  _getObjectFromFormData(data: FormData) {
    return Object.fromEntries(data.entries())
  }

  private _toggleChangeInfo(e?: MouseEvent) {
    e?.preventDefault()
    const avatar = this.children.avatar
    if (avatar instanceof Component) {
      avatar.setProps({
        isEditable: avatar.props.isEditable
          ? AvatarEditable.false
          : AvatarEditable.true
      })
    }

    const settingMainForm = this.children.settingMainForm
    if (settingMainForm instanceof Component) {
      settingMainForm.setProps({
        disabled: settingMainForm.props.disabled
          ? SecondDisabledEnum.false
          : SecondDisabledEnum.true
      })
    }
  }

  private _toggleChangePassword(e?: MouseEvent) {
    e?.preventDefault()
    if (
      this.children.settingMainForm instanceof Component &&
      this.children.changePasswordForm instanceof Component
    ) {
      this.children.settingMainForm.toggle()
      this.children.changePasswordForm.toggle()
    }
  }

  private _handleLogOut(e: MouseEvent) {
    e.preventDefault()
    SettingsController.logOut()
  }

  private _handleUploadAvatar(formData: FormData) {
    SettingsController.uploadAvatar(formData)

    store.on(StoreEvents.Updated, () => {
      const state = store.getState()
      if (this.children.avatar instanceof Component && process.env.BASE_URL) {
          const src = state.user.avatar
          this.children.avatar.setProps({ src })
      }
    })
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'large',
      isEditable: AvatarEditable.false,
      handleUpload: this._handleUploadAvatar.bind(this),
      src: this.props.user?.avatar
    })

    this.children.settingMainForm = new SettingMainForm({
      onChangeInfo: this._toggleChangeInfo.bind(this),
      onChangePassword: this._toggleChangePassword.bind(this),
      handleLogOut: this._handleLogOut.bind(this),
      validator: this.props.validator,
      disabled: SecondDisabledEnum.true,
      data: {
        ...this.props.user
      }
    })

    this.children.changePasswordForm = new ChangePasswordForm({
      validator: this.props.validator
    })
    this.children.changePasswordForm.hide()
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}

export const UserSettingsForm = withStore(UserSettingsFormModule)
