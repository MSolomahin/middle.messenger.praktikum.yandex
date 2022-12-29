import BaseInput from "../../components/baseInput";
import ButtonPrimary from "../../components/buttonPrimary";
import ButtonInline from "../../components/buttonInline";
import AuthLayout from "../../layout/authLayout/authLayout";

export default class RegistrationPage {
  async initComponents() {
    const inputFirstName = new BaseInput({
      label: "First Name",
      name: "first_name",
    });
    const inputSecondName = new BaseInput({
      label: "Second Name",
      name: "second_name",
    });
    const inputLogin = new BaseInput({
      label: "Login",
      name: "login",
    });
    const inputEmail = new BaseInput({
      label: "Email",
      type: "email",
      name: "email",
    });
    const inputPassword = new BaseInput({
      label: "Password",
      type: "password",
      name: "password",
    });
    const inputPasswordRepeat = new BaseInput({
      label: "Password (repeat)",
      type: "password",
    });
    const inputPhone = new BaseInput({
      label: "Phone",
      type: "tel",
      name: "phone",
    });

    this.components = {
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputPhone,
      inputPassword,
      inputPasswordRepeat,
    };
  }

  initLayout = () => {
    const children = Object.values(this.components).reduce(
      (result, component) => result + component.template,
      ""
    );

    this.components.authLayout = new AuthLayout({
      title: "Create account",
      children: children,
      primaryText: "Create account",
      inlineText: "Log in",
      inlineLink: "/authorization",
    });
  };

  render = async () => {
    await this.initComponents();
    this.initLayout();
    this.element = this.components.authLayout.element;
    return this.element;
  };

  destroy = () => {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  };
}
