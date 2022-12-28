import BaseInput from "../../components/baseInput";
import ButtonPrimary from "../../components/buttonPrimary";
import template from "./authorization.tmpl";
import ButtonInline from "../../components/buttonInline";
import BasePageContainer from "../../containers/basePageContainer/basePageContainer";

export default class AuthPage extends BasePageContainer {
  constructor() {
    super();
    this.template = template;
  }

  initComponents = async () => {
    const inputLogin = new BaseInput({
      label: "Login",
    });
    const inputPassword = new BaseInput({
      label: "Password",
      type: "password"
    });
    const buttonPrimary = new ButtonPrimary({
      label: "Sign in",
      handleClick: (e) => e.preventDefault(),
    });
    const buttonInline = new ButtonInline({
      label: "Create account",
      linkTo: "/registration",
      isSmall: true,
    });

    this.components = {
      inputLogin,
      inputPassword,
      buttonPrimary,
      buttonInline,
    };
    
  };
}
