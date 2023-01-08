import template from "./messenger.tmpl";
import BaseComponent from "../../core/baseComponent";
import Avatar from "../../components/avatar";

const messages = [
  {
    name: "Maxim",
    lastMessage: "Hi!",
    time: "12:34",
    countUnReading: 1,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw3NorybiFKkK8ibXTHPVw_Q&ust=1673109635892000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNC9hZ6xs_wCFQAAAAAdAAAAABAE",
  },
  {
    name: "Maxim1",
    lastMessage: "Hi!",
    time: "12:34",
    countUnReading: 1,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw3NorybiFKkK8ibXTHPVw_Q&ust=1673109635892000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNC9hZ6xs_wCFQAAAAAdAAAAABAE",
  },
];
export default class MessengerPage extends BaseComponent {
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
