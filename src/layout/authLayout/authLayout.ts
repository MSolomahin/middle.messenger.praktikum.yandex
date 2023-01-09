import template from './authLayout.tmpl'
import ButtonInline from '../../components/buttonInline'
import Templator from '../../utils/templator'
import BaseComponent from '../../core/baseComponent'
import ButtonPrimary from '../../components/buttonPrimary'
import { IBaseComponent } from '../../core/baseComponent/baseComponent.types'

export default class AuthLayout extends BaseComponent {
  primaryText: string
  inlineText: string
  inlineLink: string
  subComponents: IBaseComponent

  constructor ({ title, subComponents, primaryText, inlineText, inlineLink }) {
    super()
    this.primaryText = primaryText
    this.inlineText = inlineText
    this.inlineLink = inlineLink
    this.subComponents = subComponents

    this.template = new Templator(template).compile({
      title
    })
    this.render()
  }

  initComponents = async () => {
    const buttonPrimary = new ButtonPrimary({
      label: this.primaryText
    })

    const buttonInline = new ButtonInline({
      label: this.inlineText,
      linkTo: this.inlineLink,
      isSmall: true
    })

    this.components = {
      buttonPrimary,
      buttonInline,
      subComponents: this.subComponents
    }
  }
}
