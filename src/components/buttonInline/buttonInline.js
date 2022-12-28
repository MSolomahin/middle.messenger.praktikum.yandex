import Templator from "../../utils/templator";
import template from "./buttonInline.tmpl";
import createElement from "../../utils/createElement";
import BaseComponentContainer from "../../containers/baseComponentContainer/baseComponentContainer";

export default class ButtonInline extends BaseComponentContainer {
  constructor({label, linkTo, isSmall, isRed}) {
    super()
    this.template = new Templator(template).compile({
      label: label,
      linkTo: linkTo,
      className: `button-inline ${isSmall ? "button-inline_small" : "" } ${isRed ? "button-inline_red" : "" }`
    });

    this.render();
  }
}
