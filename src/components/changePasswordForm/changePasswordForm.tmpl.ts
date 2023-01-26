export default `
<div
  class="change-password__content"
>
  <form
    id="user-password"
    class="change-password__password-form js-submit-password"
  >
    {{inputOldPassword}} {{inputNewPassword}} {{inputNewPasswordRepeat}}
    <div class="change-password__buttons">{{buttonSavePassword}}</div>
  </form>
</div>
`
