import BaseInput from "../../components/baseInput";
import BaseComponent from "../../core/baseComponent";
import AuthLayout from "../../layout/authLayout/authLayout";
import createSubElements from "../../utils/createSubElements";

export default class RegistrationPage extends BaseComponent {
  initComponents = () => {
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
    const subComponents = createSubElements(this.components)

    this.layout = new AuthLayout({
      title: "Create account",
      subComponents: subComponents,
      primaryText: "Create account",
      inlineText: "Log in",
      inlineLink: "/authorization",
    });
  };
}
