import isEmpty from "../../utils/isEmpty"
import createElement from "../../utils/createElement"
import Templator from "../../utils/templator"

export default class BaseComponent {
  element;
  components = {};
  layout;
  template;
  subElements;

  render = () => {
    if (this.initComponents) this.initComponents();

    if (this.initLayout) {
      this.initLayout()
      this.element = this.layout.element;
      return this.element;
    }

    this.element = createElement(this.template)
    this.subElements = this.getSubElements(this.element);

    if (this.renderComponents && !isEmpty(this.subElements)) this.renderComponents();
    if (this.initEventListeners) this.initEventListeners();

    return this.element;
  }
 
  renderComponents = () => {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];
      root.append(element);
    });
  }

  getSubElements = ($element) => {
    const elements = $element.querySelectorAll("[data-element]");
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  destroy() {
    this.subElements = {};
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.remove();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}
