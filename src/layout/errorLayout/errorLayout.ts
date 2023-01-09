import template from "./errorLayout.tmpl";
import ButtonInline from "../../components/buttonInline";
import Templator from "../../utils/templator";
import BaseComponent from "../../core/baseComponent";

export default class ErrorLayout extends BaseComponent {
  constructor({title, description}) {
    super()
    this.template = new Templator(template).compile({
      title: title,
      description: description
    })

    this.render()
  }

  initComponents = () => {
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
