import createElement from "../../utils/createElement";
import Templator from "../../utils/templator";
import template from "./secondInput.tmpl";
import BaseComponentContainer from "../../core/baseComponentContainer";

export default class SecondInput extends BaseComponentContainer {
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
