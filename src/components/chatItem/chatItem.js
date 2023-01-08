import Templator from "../../utils/templator";
import template from "./chatItem.tmpl";
import BaseComponent from "../../core/baseComponent";
import Avatar from "../avatar/avatar";


export default class ChatItem extends BaseComponent {
  constructor({ image, name, lastMessage, countUnReading, time }) {
    super();
    this.image = image;
    this.template = new Templator(template).compile({
      name,
      lastMessage,
      countUnReading,
      time
    });

    this.render();
  }

  initComponents = () => {
    const avatar = new Avatar({
      size: "middle",
      src: this.image,
    });

    this.components = {
      avatar,
    };
  };
}
