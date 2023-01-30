import Component from '../../core/component'
import { ComponentBaseProps } from '../../core/component/component.types'

export interface BackButtonLayoutProps extends ComponentBaseProps {
  content: Component
  linkPath: string
}
