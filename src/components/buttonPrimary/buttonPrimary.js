import Templator from "../../utils/templator";
import template from "./buttonPrimary.tmpl";
import BaseComponentContainer from "../../containers/baseComponentContainer";

export default class ButtonPrimary extends BaseComponentContainer {
  constructor({label, handleClick}) {
    super()
    this.template = new Templator(template).compile({
      label: label,
      handleClick: handleClick,
    });

    this.render();
  }
}
