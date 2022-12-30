import template from "./userSettings.tmpl";
import ButtonInline from "../../components/buttonInline";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";
import SecondInput from "../../components/secondInput";
import ButtonPrimary from "../../components/buttonPrimary"
import Avatar from "../../components/avatar"

export default class UserSettingsPage extends BasePageContainer {
  constructor() {
    super();
    this.template = template;
  }

  initEventListeners = () => {
    this.components.buttonChangeInfo.element.addEventListener("click", this.handleChangeInfo)
    this.components.buttonSave.element.addEventListener("click", this.handleChangeInfo)
  } 

  removeEventListeners = () => {
    this.components.buttonChangeInfo.element.removeEventListener("click", this.handleChangeInfo)
    this.components.buttonSave.element.removeEventListener("click", this.handleChangeInfo)
  }

  handleChangeInfo = (e) => {
    e.preventDefault()
    const footer = this.element.querySelectorAll(".js-userSettings")
    const inputs = this.element.querySelectorAll(".js-field")

    Array.from(inputs).map((input) => {
        input.disabled = !input.disabled
        input.classList.toggle("secondInput-container__input_active")
    })

    Array.from(footer).map((item) => {
      item.classList.toggle("hidden")
    })
  }

  async initComponents() {
    const inputEmail = new SecondInput({
      label: "Email",
      value: "m.solomahin@mail.ru",
      name: "email"
    });
    const inputLogin = new SecondInput({
      label: "Login",
      value: "solomaxim",
      name: "login"
    });
    const inputFirstName = new SecondInput({
      label: "First Name",
      value: "Maxim",
      name: "first_name"
    });
    const inputSecondName = new SecondInput({
      label: "Second Name",
      value: "Solomakhin",
      name: "second_name"
    });
    const inputDisplayName = new SecondInput({
      label: "Login",
      value: "Max",
      name: "display_name"
    });
    const inputPhone = new SecondInput({
      label: "Phone",
      value: "8 (906) 678-93-82",
      name: "phone"
    });

    const buttonChangeInfo = new ButtonInline({
      label: "Change personal info",
    });
    const buttonChangePassword = new ButtonInline({
      label: "Change password",
    });
    const buttonLogOut = new ButtonInline({
      label: "Log out",
      linkTo: "/authorization",
      isRed: true
    });

    const buttonSave = new ButtonPrimary({
      label: "Save",
    });

    const avatar = new Avatar({
      size: "large",
      isEditable: true,
      title: "MS"
    })

    this.components = {
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputDisplayName,
      inputPhone,
      buttonChangeInfo,
      buttonChangePassword,
      buttonLogOut,
      buttonSave,
      avatar
    };
  }
}
