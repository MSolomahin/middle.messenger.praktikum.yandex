import BaseInput from "../../components/baseInput";
import AuthLayout from "../../layout/authLayout/authLayout";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";
import getChildrenTemplate from "../../utils/getChildrenTemplate";

export default class AuthPage extends BasePageContainer {
  initComponents = async () => {
    const inputLogin = new BaseInput({
      label: "Login",
      name: "login",
    });
    const inputPassword = new BaseInput({
      label: "Password",
      type: "password",
      name: "password",
    });

    this.components = {
      inputLogin,
      inputPassword,
    };
  };

  initLayout = () => {
    const children = getChildrenTemplate(this.components);

    const authLayout = new AuthLayout({
      title: "Log in",
      children: children,
      primaryText: "Sign in",
      inlineText: "Create account",
      inlineLink: "/registration",
    });
    this.layout = authLayout;
  };
}
