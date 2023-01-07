import Templator from "../../utils/templator";
import template from "./buttonInline.tmpl";
import BaseComponent from "../../core/baseComponent/";

export default class ButtonInline extends BaseComponent {
  constructor({label, linkTo="", isSmall, isRed, handleClick}) {
    super()

    const className = `button-inline${isSmall ? " button-inline_small" : ""}${isRed ? " button-inline_red": ""}`;
    const tag = linkTo ? "a" : "button";
    
    this.template = new Templator(template).compile({
      label,
      linkTo,
      className,
      handleClick,
      tag
    });

    this.render();
  }
}
