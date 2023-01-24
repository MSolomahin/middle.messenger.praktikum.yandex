import template from './userSettingsForm.tmpl'
import Component from '../../core/component'
import { UserSettingsProps } from './userSettingsForm.types'
import './userSettingsForm.style.css'
import SecondInput from '../../ui/secondInput'
import Avatar from '../../ui/avatar'
import { AvatarEditable } from '../../ui/avatar/avatar.types'
import ButtonInline from '../../ui/buttonInline'
import ButtonPrimary from '../../ui/buttonPrimary'
import Link from '../../ui/link'
import { InputDisabled } from '../../ui/secondInput/secondInput.types'

export default class UserSettingsForm extends Component<UserSettingsProps> {
  footer: NodeListOf<Element> | undefined
  inputs: NodeListOf<HTMLInputElement> | undefined
  userInfo: NodeListOf<Element> | undefined

  constructor(props: UserSettingsProps) {
    super({
      ...props,
      attrs: {
        class: 'user-settings'
      }
    })
  }

  override componentDidMount() {
    this.setProps({
      events: {
        submit: this._handleSubmit.bind(this)
      }
    })

    this.footer = this.element?.querySelectorAll('.js-userSettings')
    this.inputs = this.element?.querySelectorAll('.js-field')
    this.userInfo = this.element?.querySelectorAll('.user-settings__body')
  }

  private _handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement | null
    if (!target) return

    const formData = new FormData(target)

    this.props.onSubmit({
      type: target.id === 'user-settings' ? 'settings' : 'password',
      data: formData
    })

    const button = e.submitter

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

    if (!this.inputs || !this.footer) return

    Array.from(this.inputs).forEach((input) => {
      input.disabled = !input.disabled
      input.classList.toggle('second-input__input_active')
    })

    Array.from(this.footer).forEach((item) => {
      item.classList.toggle('hidden')
    })
  }

  private _toggleChangePassword(e?: MouseEvent) {
    e?.preventDefault()
    if (!this.userInfo) return

    Array.from(this.userInfo).forEach((item) => {
      item.classList.toggle('user-settings__body_hidden')
    })
  }

  init() {
    const inputEmail = new SecondInput({
      label: 'Email',
      value: 'm.solomahin@mail.ru',
      name: 'email',
      disabled: InputDisabled.true
    })
    const inputLogin = new SecondInput({
      label: 'Login',
      value: 'solomaxim',
      name: 'login',
      disabled: InputDisabled.true
    })
    const inputFirstName = new SecondInput({
      label: 'First Name',
      value: 'Maxim',
      name: 'first_name',
      disabled: InputDisabled.true
    })
    const inputSecondName = new SecondInput({
      label: 'Second Name',
      value: 'Solomakhin',
      name: 'second_name',
      disabled: InputDisabled.true
    })
    const inputDisplayName = new SecondInput({
      label: 'Login',
      value: 'Max',
      name: 'display_name',
      disabled: InputDisabled.true
    })
    const inputPhone = new SecondInput({
      label: 'Phone',
      value: '8 (906) 678-93-82',
      name: 'phone',
      disabled: InputDisabled.true
    })

    const buttonChangeInfo = new ButtonInline({
      label: 'Change personal info',
      events: {
        click: this._toggleChangeInfo.bind(this)
      }
    })
    const buttonChangePassword = new ButtonInline({
      label: 'Change password',
      events: {
        click: this._toggleChangePassword.bind(this)
      }
    })
    const buttonLogOut = new Link({
      label: 'Log out',
      linkTo: '/authorization',
      isRed: true
    })

    const buttonSaveInfo = new ButtonPrimary({
      label: 'Save',
      type: 'submit',
      attrs: {
        id: 'button-settings'
      }
    })
    const buttonSavePassword = new ButtonPrimary({
      label: 'Save',
      type: 'submit',
      attrs: {
        id: 'button-password'
      }
    })

    const avatar = new Avatar({
      size: 'large',
      isEditable: AvatarEditable.false
    })

    const inputOldPassword = new SecondInput({
      label: 'Old password',
      value: 'Max',
      name: 'old_password',
      type: 'password'
    })

    const inputNewPassword = new SecondInput({
      label: 'New password',
      value: 'Max',
      name: 'new_password',
      type: 'password'
    })

    const inputNewPasswordRepeat = new SecondInput({
      label: 'Repeat password',
      value: 'Max',
      name: 'new_password',
      type: 'password'
    })

    this.children = {
      ...this.children,
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputDisplayName,
      inputPhone,
      buttonChangeInfo,
      buttonChangePassword,
      buttonLogOut,
      buttonSaveInfo,
      buttonSavePassword,
      avatar,
      inputOldPassword,
      inputNewPassword,
      inputNewPasswordRepeat
    }
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
