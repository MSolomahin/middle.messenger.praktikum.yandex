import createElement from "../../utils/createElement";
import Templator from "../../utils/templator";
import template from "./secondInput.tmpl";
import BaseComponent from "../../core/baseComponent";

export default class SecondInput extends BaseComponent {
  constructor({label, value, name=""}) {
    super()
    this.template = new Templator(template).compile({
      label,
      value,
      name
    });

    this.render();
  }
}
