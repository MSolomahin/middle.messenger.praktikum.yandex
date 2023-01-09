import Templator from "../../utils/templator";
import template from "./buttonInline.tmpl";
import BaseComponent from "../../core/baseComponent";
import { ButtonInlineProps } from "./buttonInline.types";

export default class ButtonInline extends BaseComponent {
  constructor(props: ButtonInlineProps) {
    super()
    const {label, linkTo="", isSmall, isRed} = props;

    const className = `button-inline${isSmall ? " button-inline_small" : ""}${isRed ? " button-inline_red": ""}`;
    const tag = linkTo ? "a" : "button";
    
    this.template = new Templator(template).compile({
      label,
      linkTo,
      className,
      tag
    });

    this.render();
  }
}
