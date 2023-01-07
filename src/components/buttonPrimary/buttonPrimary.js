import Templator from "../../utils/templator";
import template from "./buttonPrimary.tmpl";
import BaseComponent from "../../core/baseComponent";

export default class ButtonPrimary extends BaseComponent {
  constructor({label, handleClick}) {
    super()
    this.template = new Templator(template).compile({
      label,
      handleClick,
    });

    this.render();
  }
}
