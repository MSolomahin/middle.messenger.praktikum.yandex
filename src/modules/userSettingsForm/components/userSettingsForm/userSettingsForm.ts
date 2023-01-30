import ChangePasswordForm from '../../../../components/changePasswordForm'
import SettingMainForm from '../../../../components/settingMainForm'
import Component from '../../../../core/component'
import Avatar from '../../../../ui/avatar'
import { AvatarEditable } from '../../../../ui/avatar/avatar.types'
import { SecondDisabledEnum } from '../../../../ui/secondInput/secondInput.types'
import Validator from '../../../../utils/validator'
import template from './userSettingsForm.tmpl'
import './userSettingsForm.style.css'

export class UserSettingsForm extends Component< { validator: Validator }> {
  constructor() {
    super({
      validator: new Validator()
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
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }
    const button = e.submitter

    if (!allIsValid) return
    if (button?.id === 'button-settings') {
      this._toggleChangeInfo()
    } else {
      this._toggleChangePassword()
    }
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

  init() {
    this.children.avatar = new Avatar({
      size: 'large',
      isEditable: AvatarEditable.false
    })

    this.children.settingMainForm = new SettingMainForm({
      onChangeInfo: this._toggleChangeInfo.bind(this),
      onChangePassword: this._toggleChangePassword.bind(this),
      validator: this.props.validator,
      disabled: SecondDisabledEnum.true
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
