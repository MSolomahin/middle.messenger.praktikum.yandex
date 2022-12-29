import Templator from "../../utils/templator";
import template from "./baseInput.tmpl";
import BaseComponentContainer from "../../core/baseComponentContainer";
import { camelToSnakeCase } from "../../utils/toSnakeCase";

export default class BaseInput extends BaseComponentContainer {
  constructor({label, type = "text", name=""}) {
    super()

    this.template = new Templator(template).compile({
      label,
      type,
      name
    });

    this.render();
  }
}
