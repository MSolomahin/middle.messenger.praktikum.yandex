export default class Templator {
  template: string;

  constructor(template: string) {
    this.template = template;
  }

  compile(ctx: Record<string, string | number>) {
    const templateVariableReg = /\{\{(.*?)\}\}/g;
    let match: RegExpExecArray | null = null;
    let result = this.template;

    while ((match = templateVariableReg.exec(this.template))) {
      const variableName = match[1].trim();
      if (!variableName) {
        continue;
      }

      const data = ctx[variableName];
      result = result.replace(new RegExp(match[0], "gi"), String(data));
    }
    return result;
  }
}
