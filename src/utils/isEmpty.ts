function isEmpty(value: any) {
  if (typeof value === "number" && value !== 0) {
    return !!value;
  }
  if (typeof value === "string") {
    return !value;
  }
  if (typeof value === "boolean") {
    return true;
  }
  if (!value) {
    return true;
  }
  if (typeof value !== "object") {
    return !value;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value.size) {
    return value.size === 0;
  }
  if (Object.keys(value).length === 0) {
    return true;
  }
  return false;
}

export default isEmpty;
