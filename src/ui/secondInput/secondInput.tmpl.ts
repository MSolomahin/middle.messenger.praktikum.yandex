export default `
  <label>{{ label }}</label>
  <input
    type="{{ type }}"
    value="{{ value }}"
    class="js-field second-input__input"
    name="{{ name }}"
    {{ disabled }}
  />
<p class="second-input__error text-xs {{ isError }}">{{ errorMessage }}</p>
`
