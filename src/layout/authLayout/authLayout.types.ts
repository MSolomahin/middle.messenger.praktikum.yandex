import Component from '../../core/component'
import { ComponentBaseProps } from '../../core/component/component.types'

export interface AuthLayoutProps extends ComponentBaseProps {
  title: string
  primaryText: string
  inlineText: string
  inlineLink: string
  subComponents: Component[]
}
