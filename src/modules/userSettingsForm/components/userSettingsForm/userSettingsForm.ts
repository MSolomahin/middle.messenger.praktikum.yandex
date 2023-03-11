import ChangePasswordForm from '../../../../components/changePasswordForm'
import SettingMainForm from '../../../../components/settingMainForm'
import Component from '../../../../core/component'
import Avatar from '../../../../ui/avatar'
import Validator from '../../../../utils/validator'
import template from './userSettingsForm.tmpl'
import './userSettingsForm.style.scss'
import SettingsController from '../../controllers/settingsController'
import { withUser } from '../../../../store/connect'
import { IStore } from '../../../../store'
import { isComponent } from '../../../../utils/isComponent'
import { getFilePath } from '../../../../utils/getFilePath'

class UserSettingsFormModule extends Component<
  IStore & { validator: Validator }
> {
  constructor(props: IStore) {
    super({
      ...props,
      validator: new Validator()
    })
  }

  override componentDidMount() {
    if (!this.props.user?.id) {
      void SettingsController.getMyUser()
    }

    this.setProps({
      events: {
        submit: this.handleSubmit.bind(this)
      }
    })
  }

  protected componentDidUpdate(
    oldProps: IStore & { validator: Validator },
    newProps: IStore & { validator: Validator }
  ): boolean {
    if (isComponent(this.children.avatar)) {
      this.children.avatar.setProps({
        src: getFilePath(newProps.user?.avatar)
      })
    }
    if (isComponent(this.children.settingMainForm)) {
      this.children.settingMainForm.setProps({
        user: newProps.user
      })
    }
    return super.componentDidUpdate(oldProps, newProps)
  }

  private handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement | null
    if (!target) return

    const formData = new FormData(target)
    const allIsValid = this.props.validator.checkForm(formData)
    const button = e.submitter
    const data = this.getObjectFromFormData(formData) as Record<string, string>

    if (!allIsValid) return

    if (button?.id === 'button-settings') {
      this.handleSubmitSettings(data)
    } else {
      this.handleSubmitPassword(data)
    }
  }

  private handleSubmitPassword(data: Record<string, string>) {
    void SettingsController.updatePassword(data.old_password, data.new_password)
    this.toggleChangePassword()
  }

  private handleSubmitSettings(data: Record<string, string>) {
    void SettingsController.updateSettings({
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone
    })
    this.toggleChangeInfo()
  }

  private getObjectFromFormData(data: FormData) {
    return Object.fromEntries(data.entries())
  }

  private toggleChangeInfo(e?: MouseEvent) {
    e?.preventDefault()
    const avatar = this.children.avatar
    if (avatar instanceof Component) {
      avatar.setProps({
        isEditable: !avatar.props.isEditable
      })
    }

    const settingMainForm = this.children.settingMainForm
    if (settingMainForm instanceof Component) {
      settingMainForm.setProps({
        disabled: !settingMainForm.props.disabled
      })
    }
  }

  private toggleChangePassword(e?: MouseEvent) {
    e?.preventDefault()
    if (
      this.children.settingMainForm instanceof Component &&
      this.children.changePasswordForm instanceof Component
    ) {
      this.children.settingMainForm.toggle()
      this.children.changePasswordForm.toggle()
    }
  }

  private handleLogOut(e: MouseEvent) {
    e.preventDefault()
    void SettingsController.logOut()
  }

  private handleUploadAvatar(formData: FormData) {
    void SettingsController.uploadAvatar(formData)
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'large',
      isEditable: false,
      handleUpload: this.handleUploadAvatar.bind(this),
      src: this.props.user?.avatar
    })

    this.children.settingMainForm = new SettingMainForm({
      onChangeInfo: this.toggleChangeInfo.bind(this),
      onChangePassword: this.toggleChangePassword.bind(this),
      handleLogOut: this.handleLogOut.bind(this),
      validator: this.props.validator,
      disabled: true,
      user: this.props.user
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

export const UserSettingsForm = withUser(UserSettingsFormModule)
