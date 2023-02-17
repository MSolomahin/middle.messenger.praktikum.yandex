import { IComponentProps } from '../core/component/component.types'

export default class Templator {
  template: string

  constructor(template: string) {
    this.template = template
  }

  compile = (ctx: IComponentProps): string => {
    const templateVariableReg = /\{\{(.*?)\}\}/g
    const templateJSReg = /\{%(.*?)%\}/g
    let result = this.template

    result = findAndReplaceJs(templateJSReg, result, ctx)
    result = findAndReplaceVariables(templateVariableReg, result, ctx)

    return result
  }
}

function findAndReplaceJs(
  regExp: RegExp,
  template: string,
  ctx: IComponentProps
) {
  let result = template
  let match: RegExpExecArray | null = null
  while ((match = regExp.exec(template)) != null) {
    const jsName = match[1].trim()

    if (!jsName) {
      continue
    }

    if (jsName.includes('&&')) {
      const condition = jsName.split('&&')[0].trim()
      const value = jsName.split('&&')[1].trim()

      result = result.replace(
        new RegExp(match[0], 'gi'),
        ctx[condition] ? value : ''
      )
    }
  }

  return result
}

function findAndReplaceVariables(
  regExp: RegExp,
  template: string,
  ctx: IComponentProps
) {
  let result = template
  let match: RegExpExecArray | null = null

  while ((match = regExp.exec(template)) != null) {
    const variableName = match[1].trim()
    if (!variableName) {
      continue
    }

    const data = variableName.includes('||')
      ? handleUnion(ctx, variableName)
      : getNestedValue(ctx, variableName)

    if (match[0].includes('||')) {
      match[0] = match[0].replace(/\|\|/gi, '\\|\\|')
    }

    result = result.replace(new RegExp(match[0], 'gi'), String(data))
  }

  return result
}

function getNestedValue(obj: Record<string, any>, path: string) {
  if (!path.includes('.')) return path === '0' ? '0' : obj[path]
  const variableArray = path.split('.')
  let temp = obj

  for (const item of variableArray) {
    if (temp[item]) {
      temp = temp[item]
    } else {
      return ''
    }
  }
  return temp
}

const handleUnion = (ctx: Record<string, any>, variableName: string) => {
  const first = variableName.split('||')[0].trim()
  const second = variableName.split('||')[1].trim()
  const data1 = getNestedValue(ctx, first)
  const data2 = getNestedValue(ctx, second)

  return data1 || data2
}
