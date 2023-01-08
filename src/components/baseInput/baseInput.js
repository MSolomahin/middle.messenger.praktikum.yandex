import Templator from "../../utils/templator";
import template from "./baseInput.tmpl";
import BaseComponent from "../../core/baseComponent";

export default class BaseInput extends BaseComponent {
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
