export const getDataFromForm = (form: HTMLFormElement) =>
    Object.fromEntries(new FormData(form).entries())
