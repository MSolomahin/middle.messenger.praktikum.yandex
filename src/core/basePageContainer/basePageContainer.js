import isEmpty from "../../utils/isEmpty"
import createElement from "../../utils/createElement"

export default class BasePageContainer {
  element;
  subElements = {};
  components = {};
  layout;

  render = async () => {
    if (this.initComponents) await this.initComponents();

    if (this.initLayout) {
      await this.initLayout()
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
    console.log($element)
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
