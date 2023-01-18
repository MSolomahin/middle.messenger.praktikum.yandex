import template from './userSettings.tmpl'
import ButtonInline from '../../components/buttonInline'
import SecondInput from '../../components/secondInput'
import ButtonPrimary from '../../components/buttonPrimary'
import Avatar from '../../components/avatar'
import Component from '../../core/component'
import { AvatarEditable } from '../../components/avatar/avatar.types'
import { InputDisabled } from '../../components/secondInput/secondInput.types'
import ArrowButton from '../../components/arrowButton/arrowButton'

export default class UserSettingsPage extends Component {
  override componentDidMount() {
    const avatar = this.children.avatar

    const formInfo = this.element?.querySelector('.js-submit-info') as HTMLFormElement
    const formPassword = this.element?.querySelector('.js-submit-password') as HTMLFormElement

    if (avatar instanceof Component) {
      avatar.getContent()?.addEventListener('change', this._uploadAvatar)
    }
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

  private readonly _uploadAvatar = (e: InputEvent) => {
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

  private _toggleChangeInfo(e?: MouseEvent) {
    e?.preventDefault()
    const avatar = this.children.avatar
    if (avatar instanceof Component) {
      avatar.setProps({
        isEditable:
          avatar.props.isEditable === AvatarEditable.true
            ? AvatarEditable.false
            : AvatarEditable.true
      })
    }

    const footer = this.element?.querySelectorAll('.js-userSettings')
    const inputs = this.element?.querySelectorAll(
      '.js-field'
    ) as NodeListOf<HTMLInputElement>

    if (!inputs || footer == null) return

    Array.from(inputs).forEach((input) => {
      input.disabled = !input.disabled
      input.classList.toggle('second-input__input_active')
    })

    Array.from(footer).forEach((item) => {
      item.classList.toggle('hidden')
    })
  }

  private _toggleChangePassword(e?: MouseEvent) {
    e?.preventDefault()
    const userInfo = this.element?.querySelectorAll('.user-settings__body')
    if (!userInfo) return

    Array.from(userInfo).forEach((item) => {
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
        click: this._toggleChangeInfo.bind(this)
      }
    })
    const buttonChangePassword = new ButtonInline({
      label: 'Change password',
      events: {
        click: this._toggleChangePassword.bind(this)
      }
    })
    const buttonLogOut = new ButtonInline({
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
      size: 'large'
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
