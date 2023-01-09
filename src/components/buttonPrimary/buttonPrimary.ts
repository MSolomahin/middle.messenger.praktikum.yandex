import Templator from "../../utils/templator";
import template from "./buttonPrimary.tmpl";
import BaseComponent from "../../core/baseComponent";
import { ButtonPrimaryProps } from "./buttonPromary.types";

export default class ButtonPrimary extends BaseComponent {
  constructor({label}: ButtonPrimaryProps) {
    super()
    this.template = new Templator(template).compile({
      label,
    });

    this.render();
  }
}
