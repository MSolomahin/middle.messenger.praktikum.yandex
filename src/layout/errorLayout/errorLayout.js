import template from "./errorLayout.tmpl";
import ButtonInline from "../../components/buttonInline";
import Templator from "../../utils/templator";
import BaseComponent from "../../core/baseComponent";

export default class ErrorLayout extends BaseComponent {
  element;
  subElements = {};
  components = {};

  constructor({title, description}) {
    super()
    this.template = new Templator(template).compile({
      title: title,
      description: description
    })

    this.render()
  }

  async initComponents() {
    const buttonInline = new ButtonInline({
      label: "Back to chats",
      linkTo: "/",
      isSmall: true,
    });

    this.components = {
      buttonInline,
    };
  }
}
