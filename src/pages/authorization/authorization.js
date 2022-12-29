import BaseInput from "../../components/baseInput";
import AuthLayout from "../../layout/authLayout/authLayout";

export default class AuthPage {
  initComponents = async () => {
    const inputLogin = new BaseInput({
      label: "Login",
      name: "login"
    });
    const inputPassword = new BaseInput({
      label: "Password",
      type: "password",
      name: "password"
    });
    const children = inputLogin.template + inputPassword.template

    const authLayout = new AuthLayout({
      title: "Log in",
      children: children,
      primaryText: "Sign in", 
      inlineText: "Create account",
      inlineLink: "/registration"
    })

    this.components = {
      authLayout
    };
  };

  render = async () => {
    await this.initComponents();
    this.element = this.components.authLayout.element;
    return this.element;
  }

  destroy = () => {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
