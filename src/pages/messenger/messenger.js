import template from "./messenger.tmpl";
import ButtonInline from "../../components/buttonInline";
import BasePageContainer from "../../containers/basePageContainer/basePageContainer";
import Templator from "../../utils/templator";

export default class MessengerPage extends BasePageContainer {
  constructor() {
    super();
    this.template = template
  }

  initComponents = async () => {
    const buttonInline = new ButtonInline({
      label: "Create account",
      linkTo: "/registration",
      isSmall: true,
    });

    this.components = {
      buttonInline,
    };
  };
}
