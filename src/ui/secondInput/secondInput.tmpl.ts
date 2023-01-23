export default `
<div class="second-input">
  <label>{{ label }}</label>
  <input
    type="{{ type }}"
    value="{{ value }}"
    {{ disabled }}
    class="js-field second-input__input"
    name="{{ name }}"
  />
</div>
`
