import AuthPage from "../pages/authorization/index.js";
import MessengerPage from "../pages/messenger/messenger.js";
import NotFoundPage from "../pages/notFound/notFound.js";
import RegistrationPage from "../pages/registration/registration.js";
import ServerErrorPage from "../pages/serverError/serverError.js";
import UserSettings from "../pages/userSettings/index.js";

const pages = {
  authorization: AuthPage,
  registration: RegistrationPage,
  messenger: MessengerPage,
  notFound: NotFoundPage,
  serverError: ServerErrorPage,
  userSettings: UserSettings,
};
export default async function (path, match) {
  const main = document.querySelector("main");

  main.classList.add("is-loading");

  // const { default: Page } = await import(`../pages/authorization/index.js`);

  const Page = pages[path] || NotFoundPage;

  const page = new Page(match);
  const element = await page.render();

  main.classList.remove("is-loading");

  const contentNode = document.querySelector("#content");

  contentNode.innerHTML = "";
  contentNode.append(element);

  return page;
}
