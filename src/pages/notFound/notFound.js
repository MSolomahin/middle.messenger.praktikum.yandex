import ErrorLayout from "../../layout/errorLayout";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";

export default class NotFoundPage extends BasePageContainer {
  async initLayout() {
    const errorLayout = new ErrorLayout({
      title: "404",
      description: "Page not found",
    });

    this.layout = errorLayout
  }
}
