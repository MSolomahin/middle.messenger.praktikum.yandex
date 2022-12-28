import template from "./userSettings.tmpl";
import ButtonInline from "../../components/buttonInline";
import BasePageContainer from "../../containers/basePageContainer/basePageContainer";
import SecondInput from "../../components/secondInput";
import ButtonPrimary from "../../components/buttonPrimary"

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
    const footer = document.querySelectorAll(".js-userSettings")
    const inputs = document.querySelectorAll(".js-field")

    Array.from(inputs).map((input) => {
        input.disabled = !input.disabled
    })

    Array.from(footer).map((item) => {
      item.classList.toggle("hidden")
    })
  }

  async initComponents() {
    const inputEmail = new SecondInput({
      label: "Email",
      value: "m.solomahin@mail.ru"
    });
    const inputLogin = new SecondInput({
      label: "Login",
      value: "solomax"
    });
    const inputFirstName = new SecondInput({
      label: "First Name",
      value: "Maxim"
    });
    const inputSecondName = new SecondInput({
      label: "Second Name",
      value: "Solomakhin"
    });
    const inputDisplayName = new SecondInput({
      label: "Login",
      value: "Max"
    });
    const inputPhone = new SecondInput({
      label: "Phone",
      value: "8 (906) 678-93-82"
    });

    const buttonChangeInfo = new ButtonInline({
      label: "Change personal info",
      linkTo: ""
    });
    const buttonChangePassword = new ButtonInline({
      label: "Change password",
      linkTo: "/authorization",
    });
    const buttonLogOut = new ButtonInline({
      label: "Log out",
      linkTo: "/authorization",
      isRed: true
    });

    const buttonSave = new ButtonPrimary({
      label: "Save",
      handleClick: () => {}
    });

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
      buttonSave
    };
  }
}
