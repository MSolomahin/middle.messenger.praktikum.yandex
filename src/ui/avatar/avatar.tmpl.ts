export default `
<div class="{{ isEditable }}">
  <label class="avatar__hover-block hover-block">
    <input
      class="hover-block__input"
      type="file"
      accept="image/*"
      name="avatar"
    />
    <p class="text-m text-white hover-block__text">Change avatar</p>
  </label>
</div>
`