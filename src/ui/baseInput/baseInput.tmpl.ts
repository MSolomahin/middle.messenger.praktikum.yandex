export default `
  <input type="{{ type }}" required name="{{ name }}" required="{{ required }}" value="{{value}}"/>
  <label>{{ label }}</label>
  <p class="input-base__error text-xs {{ isError }}">{{ errorMessage }}</p>
`
