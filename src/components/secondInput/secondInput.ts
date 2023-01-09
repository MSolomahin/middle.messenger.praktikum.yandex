import Templator from "../../utils/templator";
import template from "./secondInput.tmpl";
import BaseComponent from "../../core/baseComponent";
import { SecondInputProps } from "./secondInput.types";

export default class SecondInput extends BaseComponent {
  constructor(props: SecondInputProps) {
    super();
    const { label, value, name } = props;
    this.template = new Templator(template).compile({
      label,
      value,
      name,
    });

    this.render();
  }
}
