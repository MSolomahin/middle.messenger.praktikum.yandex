import Templator from "../../utils/templator";
import template from "./chatItem.tmpl";
import BaseComponent from "../../core/baseComponent";
import Avatar from "../avatar/avatar";
import { ChatItemProps } from "./chatItem.types";


export default class ChatItem extends BaseComponent {
  image: string;

  constructor(props: ChatItemProps) {
    super();
    const {image, name, lastMessage, countUnReading, time} = props
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
