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

    result = this.findAndReplaceJs(templateJSReg, result, ctx)
    result = this.findAndReplaceVariables(templateVariableReg, result, ctx)

    return result
  }

  private findAndReplaceJs(
    regExp: RegExp,
    template: string,
    ctx: IComponentProps
  ) {
    let result = template
    let match: RegExpExecArray | null = null
    while ((match = regExp.exec(template)) != null) {
      const jsName = match[1].trim()

      if (!jsName) continue

      result = this.findAndReplaceIntersection(jsName, result, match[0], ctx)
      result = this.findAndReplaceTernary(jsName, result, match[0], ctx)
    }

    return result
  }

  private findAndReplaceIntersection(
    matchString: string,
    template: string,
    match: string,
    ctx: IComponentProps
  ) {
    let result = template
    if (matchString.includes('&&')) {
      const [condition, value] = matchString.split(' && ')

      const conditionValue = condition.includes('===')
        ? this.handleComparison(ctx, condition)
        : this.getNestedValue(ctx, condition)

      result = template.replace(
        new RegExp(match, 'gi'),
        conditionValue ? value : ''
      )
    }

    return result
  }

  private handleComparison(ctx: IComponentProps, condition: string) {
    let result
    if (condition.includes('===')) {
      const splitCondition = condition.split(' === ')
      result = ctx[splitCondition[0]] === splitCondition[1]
    }

    return result
  }

  private findAndReplaceTernary(
    matchString: string,
    template: string,
    match: string,
    ctx: IComponentProps
  ) {
    let result = template

    if (matchString.includes('?')) {
      let string = matchString
      string = string.replace(/:/g, '?')

      const stringSplitted = string.split(' ? ')
      const [contrition, firstResult, secondResult] = stringSplitted

      const conditionValue = this.getNestedValue(ctx, contrition)

      result = template.replace(
        new RegExp(match.replace('?', '\\?'), 'gi'),
        conditionValue ? firstResult : secondResult
      )
    }

    return result
  }

  private findAndReplaceVariables(
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
        ? this.handleUnion(ctx, variableName)
        : this.getNestedValue(ctx, variableName)

      if (match[0].includes('||')) {
        match[0] = match[0].replace(/\|\|/gi, '\\|\\|')
      }

      result = result.replace(new RegExp(match[0], 'gi'), String(data))
    }

    return result
  }

  private getNestedValue(obj: Record<string, any>, path: string) {
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

  private handleUnion(ctx: Record<string, any>, variableName: string) {
    const first = variableName.split('||')[0].trim()
    const second = variableName.split('||')[1].trim()
    const data1 = this.getNestedValue(ctx, first)
    const data2 = this.getNestedValue(ctx, second)

    return data1 || data2
  }
}
