export default `
<div class="auth-layout__container">
  <form class="auth-layout__content">
    <h1 class="text-xxl">Create account</h1>
    <div class="auth-layout__form">
      {{inputFirstName}} {{inputSecondName}} {{inputLogin}} {{inputEmail}}
      {{inputPhone}} {{inputPassword}} {{inputPasswordRepeat}}
    </div>
    <div class="auth-layout__footer">
      <div class="auth-layout__button_primary">{{buttonPrimary}}</div>
      <div class="auth-layout__button_inline">{{buttonInline}}</div>
    </div>
  </form>
</div>
`
