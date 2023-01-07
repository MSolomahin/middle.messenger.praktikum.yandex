export default class Templator {
  constructor(template) {
    this.template = template;
  }

  compile(ctx) {
    const templateVariableReg = /\{\{(.*?)\}\}/g;
    let match = null;
    let result = this.template;

    while ((match = templateVariableReg.exec(this.template))) {
      const variableName = match[1].trim();
      if (!variableName) {
        continue;
      }

      const data = ctx[variableName];
      result = result.replace(new RegExp(match[0], "gi"), data);
    }
    return result;
  }
}
