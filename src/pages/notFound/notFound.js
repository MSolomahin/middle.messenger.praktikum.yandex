import ErrorLayout from "../../layout/errorLayout";
import BaseComponent from "../../core/baseComponent/";

export default class NotFoundPage extends BaseComponent {
  async initLayout() {
    const errorLayout = new ErrorLayout({
      title: "404",
      description: "Page not found",
    });

    this.layout = errorLayout
  }
}
