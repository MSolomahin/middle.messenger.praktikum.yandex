export default `
  <input type="{{ type }}" required name="{{ name }}" required="{{ required }}"/>
  <label>{{ label }}</label>
  <p class="input-base__error text-xs {{ isError }}">{{ error }}</p>
`
