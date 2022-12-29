export default `
<div class="authLayout__container">
  <form class="authLayout__content">
    <p class="text-xxl">{{ title }}</p>
    <div class="authLayout__form">
      {{ children }}
    </div>
    <div class="authLayout__footer">
      <div
        data-element="buttonPrimary"
        class="authLayout__button_primary"
      ></div>
      <div data-element="buttonInline" class="authLayout__button_inline"></div>
    </div>
  </form>
</div>
`