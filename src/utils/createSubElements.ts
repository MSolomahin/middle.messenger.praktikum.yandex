import { IBaseComponent } from "../core/baseComponent/baseComponent.types";

const createSubElements = (elements: Record<string, IBaseComponent>) => {
  const root = document.createElement("div");
  root.setAttribute("style", "display: contents");

  Object.values(elements).map((element) => {
    if (element.element) {
      root.append(element.element);
    }
  });

  return { element: root };
};

export default createSubElements;
