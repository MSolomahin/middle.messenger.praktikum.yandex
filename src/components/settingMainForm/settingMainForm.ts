import template from './settingMainForm.tmpl'
import Component from '../../core/component'
import ButtonPrimary from '../../ui/buttonPrimary'
import './settingMainForm.style.css'
import { SettingMainFormProps } from './settingMainForm.types'
import SecondInput from '../../ui/secondInput'
import ButtonInline from '../../ui/buttonInline'
import Link from '../../ui/link'

export default class SettingMainForm extends Component<SettingMainFormProps> {
  constructor(props: SettingMainFormProps) {
    super(props)
  }

  protected componentDidUpdate(
    oldProps: SettingMainFormProps,
    newProps: SettingMainFormProps
  ) {
    if (oldProps.disabled !== newProps.disabled) {
      Object.entries(this.children).forEach(([key, value]) => {
        if (key.includes('input') && value instanceof Component) {
          value.setProps({
            disabled: newProps.disabled
          })
          value.render()
        }
      })
    }
    const {
      buttonChangeInfo,
      buttonChangePassword,
      buttonLogOut,
      buttonSaveInfo
     } = this.children as Record<string, Component>
     buttonChangeInfo.toggle()
     buttonChangePassword.toggle()
     buttonLogOut.toggle()
     buttonSaveInfo.toggle()

    return super.componentDidUpdate(oldProps, newProps)
  }

  init() {
    const inputEmail = new SecondInput({
      label: 'Email',
      value: 'm.solomahin@mail.ru',
      name: 'email',
      disabled: this.props.disabled,
      validate: this.props.validator.checkEmail.bind(this)
    })
    const inputLogin = new SecondInput({
      label: 'Login',
      value: 'solomahin',
      name: 'login',
      disabled: this.props.disabled,
      validate: this.props.validator.checkLogin.bind(this)
    })
    const inputFirstName = new SecondInput({
      label: 'First Name',
      value: 'Maxim',
      name: 'first_name',
      disabled: this.props.disabled,
      validate: this.props.validator.checkName.bind(this)
    })
    const inputSecondName = new SecondInput({
      label: 'Second Name',
      value: 'Solomakhin',
      name: 'second_name',
      disabled: this.props.disabled,
      validate: this.props.validator.checkName.bind(this)
    })
    const inputDisplayName = new SecondInput({
      label: 'Login',
      value: 'Max',
      name: 'display_name',
      disabled: this.props.disabled,
      validate: this.props.validator.checkLogin.bind(this)
    })
    const inputPhone = new SecondInput({
      label: 'Phone',
      value: '89066789382',
      name: 'phone',
      disabled: this.props.disabled,
      validate: this.props.validator.checkPhone.bind(this)
    })

    const buttonChangeInfo = new ButtonInline({
      label: 'Change personal info',
      events: {
        click: this.props.onChangeInfo
      }
    })
    const buttonChangePassword = new ButtonInline({
      label: 'Change password',
      events: {
        click: this.props.onChangePassword
      }
    })
    const buttonLogOut = new Link({
      label: 'Log out',
      linkTo: '/',
      isRed: true
    })

    const buttonSaveInfo = new ButtonPrimary({
      label: 'Save',
      type: 'submit',
      attrs: {
        id: 'button-settings'
      }
    })
    buttonSaveInfo.hide()

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
      buttonSaveInfo
    }
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
