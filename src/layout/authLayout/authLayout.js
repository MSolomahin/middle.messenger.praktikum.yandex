import template from "./authLayout.tmpl";
import ButtonInline from "../../components/buttonInline";
import createElement from "../../utils/createElement";
import Templator from "../../utils/templator";
import BasePageContainer from "../../core/basePageContainer/basePageContainer";
import ButtonPrimary from "../../components/buttonPrimary";

export default class AuthLayout extends BasePageContainer  {
  constructor({title, children, primaryText, inlineText, inlineLink}) {
    super()
    this.primaryText = primaryText;
    this.inlineText = inlineText;
    this.inlineLink = inlineLink;

    this.template = new Templator(template).compile({
      title,
      children
    })

    console.log(this.template)
    this.render()
  }

  initComponents = async () => {
    const buttonPrimary = new ButtonPrimary({
      label: this.primaryText,
      handleClick: (e) => e.preventDefault(),
    });
    
    const buttonInline = new ButtonInline({
      label: this.inlineText,
      linkTo: this.inlineLink,
      isSmall: true,
    });

    this.components = {
      buttonPrimary,
      buttonInline,
    };
    
  };
}
