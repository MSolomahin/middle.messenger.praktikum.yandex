import Templator from '../../utils/templator'
import template from './baseInput.tmpl'
import BaseComponent from '../../core/baseComponent'
import { BaseInputProps } from './baseInput.types'

export default class BaseInput extends BaseComponent {
  constructor (props: BaseInputProps) {
    super()
    this.template = new Templator(template).compile({ ...props })

    this.render()
  }
}
