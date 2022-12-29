import createElement from "../../utils/createElement";

export default class BaseComponentContainer {
  template = null

  render = async () => {
    this.element = createElement(this.template)
    if (this.initEventListeners) this.initEventListeners();
    return this.element;
  }

  remove = () => {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy = () => {
    this.remove();
    this.element = null;
  }
}
