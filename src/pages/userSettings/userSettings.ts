import template from './userSettings.tmpl'
import ButtonInline from '../../components/buttonInline'
import SecondInput from '../../components/secondInput'
import ButtonPrimary from '../../components/buttonPrimary'
import Avatar from '../../components/avatar'
import Component from '../../core/component'

export default class UserSettingsPage extends Component {
  private _fileInput: HTMLInputElement

  override componentDidMount() {
    this._fileInput = this.element?.querySelector(
      "input[type='file']"
    ) as HTMLInputElement
    this._fileInput?.addEventListener('change', this._uploadAvatar)
    console.log(this.element)
  }

  private readonly _uploadAvatar = () => {
    const avatar = this.children.avatar as Component
    const file = this._fileInput?.files?.[0]
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
    e.preventDefault()

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

  init() {
    const inputEmail = new SecondInput({
      label: 'Email',
      value: 'm.solomahin@mail.ru',
      name: 'email'
    })
    const inputLogin = new SecondInput({
      label: 'Login',
      value: 'solomaxim',
      name: 'login'
    })
    const inputFirstName = new SecondInput({
      label: 'First Name',
      value: 'Maxim',
      name: 'first_name'
    })
    const inputSecondName = new SecondInput({
      label: 'Second Name',
      value: 'Solomakhin',
      name: 'second_name'
    })
    const inputDisplayName = new SecondInput({
      label: 'Login',
      value: 'Max',
      name: 'display_name'
    })
    const inputPhone = new SecondInput({
      label: 'Phone',
      value: '8 (906) 678-93-82',
      name: 'phone'
    })

    const buttonChangeInfo = new ButtonInline({
      label: 'Change personal info',
      events: {
        click: this._handleChangeInfo.bind(this)
      }
    })
    const buttonChangePassword = new ButtonInline({
      label: 'Change password'
    })
    const buttonLogOut = new ButtonInline({
      label: 'Log out',
      linkTo: '/authorization',
      isRed: true
    })

    const buttonSave = new ButtonPrimary({
      label: 'Save',
      events: {
        click: this._handleChangeInfo.bind(this)
      }
    })

    const avatar = new Avatar({
      size: 'large',
      isEditable: true
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
      buttonSave,
      avatar
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
