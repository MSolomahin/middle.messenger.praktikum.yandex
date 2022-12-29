import template from "./messenger.tmpl";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";
import Avatar from "../../components/avatar";

export default class MessengerPage extends BasePageContainer {
  constructor() {
    super();
    this.template = template
  }

  initComponents = async () => {
    const avatar = new Avatar({
      size: "tiny",
      title: "MS"
    })

    this.components = {
      avatar
    };
  };
}
