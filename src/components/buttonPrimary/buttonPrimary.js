import Templator from "../../utils/templator";
import template from "./buttonPrimary.tmpl";
import BaseComponentContainer from "../../core/baseComponentContainer";

export default class ButtonPrimary extends BaseComponentContainer {
  constructor({label, handleClick}) {
    super()
    this.template = new Templator(template).compile({
      label,
      handleClick,
    });

    this.render();
  }
}
