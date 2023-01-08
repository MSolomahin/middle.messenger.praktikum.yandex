import ErrorLayout from "../../layout/errorLayout";
import BaseComponent from "../../core/baseComponent";

export default class ServerErrorPage extends BaseComponent {
  async initLayout() {
    const errorLayout = new ErrorLayout({
      title: "500",
      description: "We've already started fixing it.",
    });

    this.layout = errorLayout;
  }
}
