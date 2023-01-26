/* eslint-disable no-useless-escape */
export const RegExps: Record<string, RegExp> = {
  name: /^([A-Z]{1}[-a-z]{1,14})|([А-Я]{1}[-а-я]{1,14})$/m,
  login: /^(?=.*[A-Za-z])([A-Za-z_\-\d]{3,20})$/m,
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/m,
  password: /^(?=.*[A-Z])(?=.*\d)[\S]{8,40}$/m,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/m,
  message: /^(?!\s*$).+/m
}

export const inputFields: Record<string, string> = {
  first_name: 'name',
  second_name: 'name',
  login: 'login',
  email: 'email',
  password: 'password',
  password_repeat: 'password',
  phone: 'phone'
}

const DEFAULT_ERROR = 'The field is filled incorrectly'

export default class Validator {
  public errors: Record<string, string> = {}
  private _password: string = ''

  public checkForm(formData: FormData) {
    formData.forEach((value, name) => {
      const validMessage = this.checkField(name, value as string)
      this.errors[name] = validMessage || ''
    })

    const allIsValid = Object.values(this.errors).find(item => item !== '')
    return !allIsValid
  }

  public checkField(name: string, value: string) {
    const type = inputFields[name]
    const isValid = RegExps[type].test(value)
    let error = !isValid ? DEFAULT_ERROR : ''

    if (name === 'password') {
      this._password = value
    }
    if (name === 'password_repeat' && value !== this._password) {
      error = 'Password are not same'
    }

    return error
  }
}
