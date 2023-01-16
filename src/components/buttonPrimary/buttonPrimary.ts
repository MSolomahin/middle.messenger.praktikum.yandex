import template from './buttonPrimary.tmpl'
import { ButtonPrimaryProps } from './buttonPrimary.types'
import component from '../../core/component'

export default class ButtonPrimary extends component {
  constructor (props: ButtonPrimaryProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
