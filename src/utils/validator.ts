/* eslint-disable no-useless-escape */
export const RegExps: Record<string, RegExp> = {
  name: /^([A-Z]{1}[-a-z]{1,14})|([А-Я]{1}[-а-я]{1,14})$/gm,
  login: /^([A-Z]{1}[-a-z]{1,14})|([А-Я]{1}[-а-я]{1,14})$/gm,
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm,
  password: /^(?=.*[a-z])(?=.*\d)[\S]{8,40}$/gm,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/gm,
  message: /^(?!\s*$).+/gm
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

export default class Validator {
  errors: Record<string, string> = {}
  public isValidAll: boolean = false

  checkField(type: string, value: string) {
    return RegExps[type].test(value)
  }

  checkName(name: string, value: string) {
    const result = RegExps.name.test(value)
    if (result) {
      this.errors[name] = ''
      return true
    } else {
      this.errors[name] = 'Error'
      return false
    }
}
}
