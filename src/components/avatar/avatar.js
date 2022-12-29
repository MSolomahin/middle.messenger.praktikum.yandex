import Templator from "../../utils/templator";
import template from "./avatar.tmpl";
import BaseComponentContainer from "../../core/baseComponentContainer";

export default class Avatar extends BaseComponentContainer {
  constructor({size, isEditable = false, title}) {
    super()
    this.template = new Templator(template).compile({
      size,
      isEditable: isEditable ? "avatar__container_editable" : "",
      title
    });
    this.fileInput = null
    this.render();
  }

  initEventListeners = () => {
    this.fileInput = this.element.querySelector("input[type='file']")
    this.fileInput.addEventListener("change", this.uploadAvatar)
  }

  uploadAvatar = () => {
    const avatar = this.element;
    const file = this.fileInput.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      avatar.style.background = `url(${reader.result}) no-repeat center center / cover`;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } 
  }
}
