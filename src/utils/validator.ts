/* eslint-disable no-useless-escape */
export const RegExps: Record<string, RegExp> = {
  name: /^([A-Z]{1}[-a-z]{1,})|([А-Я]{1}[-а-я]{1,})$/,
  login: /^(?=.*[A-Za-z])([A-Za-z_\-\d]{3,20})$/m,
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/m,
  password: /^(?=.*[A-Z])(?=.*\d)[\S]{8,40}$/m,
  phone: /^[\+]?[\d]{1,}$/m,
  message: /^(?!\s*$).+/m
}

export const inputFields: Record<string, string> = {
  first_name: 'name',
  second_name: 'name',
  login: 'login',
  email: 'email',
  password: 'password',
  password_repeat: 'password',
  phone: 'phone',
  display_name: 'name',
  old_password: 'password',
  new_password: 'password',
  new_password_repeat: 'password'
}

export default class Validator {
  public errors: Record<string, string> = {}
  public allIsValid: boolean = true
  private _password: string = ''

  public checkForm(formData: FormData) {
    formData.forEach((value, name) => {
      if (name !== 'avatar') {
        let validMessage = ''
        switch (inputFields[name]) {
          case 'name':
            validMessage = this.checkName(value as string)
            break
          case 'login':
            validMessage = this.checkLogin(value as string)
            break
          case 'email':
            validMessage = this.checkEmail(value as string)
            break
          case 'password':
            validMessage = this.checkPassword(value as string)
            break
          case 'phone':
            validMessage = this.checkPhone(value as string)
            break
        }
        this.errors[name] = validMessage || ''
      }
    })

    const allIsValid = Object.values(this.errors).find((item) => item !== '')
    this.allIsValid = !allIsValid

    return this.allIsValid
  }

  public checkName(value: string) {
    if (!value) return ''
    const match = value.match(RegExps.name)
    if (!/^[A-Z]{1}|[А-Я]{1}$/.test(value[0])) {
      return 'First letter must be upper'
    } else if (!match || match[0].length !== value.length) {
      return 'Must not contain spaces, numbers or special characters'
    }
    return ''
  }

  public checkLogin(value: string) {
    if (!value) return ''
    const match = value.match(RegExps.login)

    if (value.length < 3 || value.length > 20) {
      return 'Length must be between 3 and 20 characters'
    }
    if (Number(value)) {
      return 'Can not contains only numbers'
    }
    if (value.includes(' ')) {
      return 'Can not contains spaces'
    }

    if (!match || match[0].length !== value.length) {
      return 'Only latin characters, "-" or "_"'
    }
    return ''
  }

  public checkPassword(value: string) {
    const match = value.match(RegExps.password)
    if (!value) {
      this._password = ''
      return ''
    }
    if (!this._password) {
      this._password = value
    }
    if (value !== this._password) {
      return 'Password are not same'
    }

    if (value.length < 8 || value.length > 40) {
      return 'Length must be between 8 and 40 characters'
    }
    if (value.includes(' ')) {
      return 'Can not contains spaces'
    }
    if (!match || match[0].length !== value.length) {
      return 'Must be at least one capital letter and number'
    }
    return ''
  }

  public checkPhone(value: string) {
    if (!value) return ''
    const match = value.match(RegExps.phone)

    if (value.length < 10 || value.length > 15) {
      return 'Length must be between 10 and 15 characters'
    }
    if (!match || match[0].length !== value.length) {
      return 'Must consist of numbers only, may start with a plus'
    }
    return ''
  }

  public checkEmail(value: string) {
    if (!value) return ''
    const match = value.match(RegExps.email)
    const onlyLatin = value.match(/^[А-Яа-я]{1,}$/m)

    if (onlyLatin?.[0]) {
      return 'Only Latin letters'
    }
    if (!match || match[0].length !== value.length) {
      return 'Can include numbers and special characters like a hyphen, there must be a “dog” (@) and a dot after it, but there must be letters before the dot.'
    }
    return ''
  }
}
