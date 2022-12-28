import BaseInput from "../../components/baseInput";
import ButtonPrimary from "../../components/buttonPrimary";
import template from "./registration.tmpl";
import ButtonInline from "../../components/buttonInline";
import BasePageContainer from "../../containers/basePageContainer/basePageContainer";

export default class RegistrationPage extends BasePageContainer {
  constructor() {
    super();
    this.template = template;
  }

  async initComponents() {
    const inputFirstName = new BaseInput({
      label: "First Name",
    });
    const inputSecondName = new BaseInput({
      label: "Second Name",
    });
    const inputLogin = new BaseInput({
      label: "Login",
    });
    const inputEmail = new BaseInput({
      label: "Email",
      type: "email"
    });
    const inputPassword = new BaseInput({
      label: "Password",
      type: "password"
    });
    const inputPasswordRepeat = new BaseInput({
      label: "Password (repeat)",
      type: "password"
    });
    const inputPhone = new BaseInput({
      label: "Phone",
      type: "tel"
    });

    const buttonPrimary = new ButtonPrimary({
      label: "Create account",
      handleClick: () => console.log("click"),
    });
    const buttonInline = new ButtonInline({
      label: "Log in",
      linkTo: "/authorization",
      isSmall: true,
    });

    this.components = {
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputPassword,
      inputPasswordRepeat,
      inputPhone,
      buttonPrimary,
      buttonInline,
    };
  }
}
