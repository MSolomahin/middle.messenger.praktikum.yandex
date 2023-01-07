import template from "./errorLayout.tmpl";
import ButtonInline from "../../components/buttonInline";
import createElement from "../../utils/createElement";
import Templator from "../../utils/templator";

export default class ErrorLayout {
  element;
  subElements = {};
  components = {};

  constructor({title, description}) {
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

  async render() {
    this.element = createElement(this.template)

    await this.initComponents();
    this.subElements = this.getSubElements(this.element)
    this.renderComponents();

    return this.element;
  }

  renderComponents() {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];
      root.append(element);
    });
  }

  getSubElements($element) {
    const elements = $element.querySelectorAll("[data-element]");
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
