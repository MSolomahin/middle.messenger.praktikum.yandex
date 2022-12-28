import Templator from "../../utils/templator";
import template from "./baseInput.tmpl";
import BaseComponentContainer from "../../containers/baseComponentContainer";

export default class BaseInput extends BaseComponentContainer {
  constructor({label, type = "text"}) {
    super()
    this.template = new Templator(template).compile({
      label,
      type
    });

    this.render();
  }
}
