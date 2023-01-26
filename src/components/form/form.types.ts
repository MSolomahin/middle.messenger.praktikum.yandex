import Component from '../../core/component'
import { ComponentBaseProps } from '../../core/component/component.types'

export interface FromProps extends ComponentBaseProps {
    title: string
    subComponents: Component[]
    linkPath: string
    linkText: string
    buttonText: string
    disable?: boolean
}
