import ErrorLayout from "../../layout/errorLayout";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";

export default class ServerErrorPage extends BasePageContainer {
  async initLayout() {
    const errorLayout = new ErrorLayout({
      title: "500",
      description: "We've already started fixing it.",
    });

    this.layout = errorLayout;
  }
}
