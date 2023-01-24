import Component from '../../../../core/component'
import template from './userSettingsForm.tmpl'
import UserSettingsFrom from '../../../../components/userSettingsForm'
import { SubmitData } from './userSettingsForm.types'

export class UserSettings extends Component {
  private _handleSubmit (props: SubmitData) {
    for (const [name, value] of props.data) {
      console.log(`${name} = ${value as string}`)
    }
  }

  init() {
    this.children.userSettingsFrom = new UserSettingsFrom({
      onSubmit: this._handleSubmit.bind(this)
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}
