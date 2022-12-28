import createElement from "../../utils/createElement";

export default class BaseComponentContainer {
  render = async () => {
    this.element = createElement(this.template)
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
