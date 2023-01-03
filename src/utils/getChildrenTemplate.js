const getChildrenTemplate = (components) => {
  return Object.values(components).reduce(
    (result, component) => result + component.template,
    ""
  );
};

export default getChildrenTemplate;