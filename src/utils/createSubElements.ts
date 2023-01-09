interface IElement {
    element: Element;
}

const createSubElements = (elements: Record<string, IElement>) => {
    const root = document.createElement("div");
    root.setAttribute("style", "display: contents");

    Object.values(elements).map((element) => {
        root.append(element.element);
    })
    
    return {element: root}
}

export default createSubElements;
