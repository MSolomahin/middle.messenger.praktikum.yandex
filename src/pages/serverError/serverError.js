import ErrorLayout from "../../layout/errorLayout";

export default class ServerErrorPage {
  element;
  subElements = {};
  components = {};

  async initComponents() {
    const errorLayout = new ErrorLayout({
      title: "505",
      description: "We've already started fixing it.",
    });

    this.components = {
      errorLayout,
    };
  }

  async render() {
    await this.initComponents();
    this.element = this.components.errorLayout.element;
    return this.element;
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
