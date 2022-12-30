import isEmpty from "../../utils/isEmpty"

export default class BasePageContainer {
  element;
  subElements = {};
  components = {};

  render = async () => {
    const element = document.createElement("div");

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    if (this.initComponents) await this.initComponents();
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

  destroy = () => {
    if (this.removeEventListeners) this.removeEventListeners()
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
