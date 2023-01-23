import template from './userSettings.tmpl'
import ButtonInline from '../../ui/buttonInline'
import SecondInput from '../../ui/secondInput'
import ButtonPrimary from '../../ui/buttonPrimary'
import Avatar from '../../ui/avatar'
import Component from '../../core/component'
import { InputDisabled } from '../../ui/secondInput/secondInput.types'
import ArrowButton from '../../ui/arrowButton/arrowButton'
import Link from '../../ui/link/link'
import { AvatarEditable } from '../../ui/avatar/avatar.types'

export default class UserSettingsPage extends Component {
  footer: NodeListOf<Element> | undefined
  inputs: NodeListOf<HTMLInputElement> | undefined
  userInfo: NodeListOf<Element> | undefined

  override componentDidMount() {
    const formInfo = this.element?.querySelector('.js-submit-info')
    const formPassword = this.element?.querySelector('.js-submit-password')

    if (!formInfo || !formPassword) return

    formInfo.addEventListener('submit', this._handleSubmitInfo)
    formPassword.addEventListener('submit', this._handleSubmitPassword)
  }

  private readonly _handleSubmitInfo = (e: SubmitEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement

    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }

    this._toggleChangeInfo()
  }

  private readonly _handleSubmitPassword = (e: SubmitEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const formData = new FormData(target)
    for (const [name, value] of formData) {
      console.log(`${name} = ${value as string}`)
    }

    this._toggleChangePassword()
  }

  private _uploadAvatar (e: InputEvent) {
    console.log(e)
    const input = e.target as HTMLInputElement
    const avatar = this.children.avatar as Component
    const file = input?.files?.[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      if (avatar.element && typeof reader.result === 'string') {
        avatar.element.style.background = `url(${reader.result}) no-repeat center center / cover`
      }
    }

    if (file != null) {
      reader.readAsDataURL(file)
    }
  }

  private _handleChangeInfo(e: MouseEvent) {
    e?.preventDefault()
    this._toggleChangeInfo()
  }

  private _toggleChangeInfo() {
    const avatar = this.children.avatar
    if (avatar instanceof Component) {
      avatar.setProps({
        isEditable: avatar.props.isEditable ? AvatarEditable.false : AvatarEditable.true
      })
    }

    if (!this.footer) {
      this.footer = this.element?.querySelectorAll('.js-userSettings')
    }
    if (!this.inputs) {
      this.inputs = this.element?.querySelectorAll(
        '.js-field'
      )
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

  private _handleChangePassword(e: MouseEvent) {
    e?.preventDefault()
    this._toggleChangePassword()
  }

  private _toggleChangePassword() {
    if (!this.userInfo) {
      this.userInfo = this.element?.querySelectorAll('.user-settings__body')
    }
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

    const arrowButton = new ArrowButton({
      side: 'left',
      link: '/'
    })

    const buttonChangeInfo = new ButtonInline({
      label: 'Change personal info',
      events: {
        click: this._handleChangeInfo.bind(this)
      }
    })
    const buttonChangePassword = new ButtonInline({
      label: 'Change password',
      events: {
        click: this._handleChangePassword.bind(this)
      }
    })
    const buttonLogOut = new Link({
      label: 'Log out',
      linkTo: '/authorization',
      isRed: true
    })

    const buttonSaveInfo = new ButtonPrimary({
      label: 'Save',
      type: 'submit'
    })
    const buttonSavePassword = new ButtonPrimary({
      label: 'Save',
      type: 'submit'
    })

    const avatar = new Avatar({
      size: 'large',
      isEditable: AvatarEditable.false,
      events: {
        change: this._uploadAvatar.bind(this)
      }
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
      inputNewPasswordRepeat,
      arrowButton
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
