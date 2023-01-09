import template from "./messenger.tmpl";
import BaseComponent from "../../core/baseComponent";
import Avatar from "../../components/avatar";
import { IMessage, messages } from "../../assets/mocks/messages";

export default class MessengerPage extends BaseComponent {
  messages: IMessage[];

  constructor() {
    super();
    this.template = template;
    this.messages = messages;
  }

  initComponents = async () => {
    const avatar = new Avatar({
      size: "tiny",
    });

    this.components = {
      avatar,
    };
  };
}
