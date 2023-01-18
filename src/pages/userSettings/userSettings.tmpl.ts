export default `
<div class="user-settings">
  <div class="user-settings__container">
    <div class="user-settings__comeback">
      {{ arrowButton}}
    </div>
    <div class="user-settings__main">
      <form class="user-settings__content js-submit-info">
        <div class="user-settings__avatar avatar">
          {{avatar}}
          <h2 class="text-xl">Maxim</h2>
        </div>
        <div class="user-settings__body">
          <div class="user-settings__userInfo-form">
            {{inputEmail}} {{inputLogin}} {{inputFirstName}} {{inputSecondName}}
            {{inputDisplayName}} {{inputPhone}}
            <div class="user-settings__buttons js-userSettings">
              {{buttonChangeInfo}}
              <div class="separatop"></div>
              {{buttonChangePassword}}
              <div class="separatop"></div>
              {{buttonLogOut}}
            </div>
            <div class="user-settings__buttons js-userSettings hidden">
              {{buttonSaveInfo}}
            </div>
          </div>
        </div>
      </form>
      <div class="user-settings__content user-settings__body user-settings__body_hidden">
        <form id="user-password" class="user-settings__password-form js-submit-password">
          {{inputOldPassword}} {{inputNewPassword}} {{inputNewPasswordRepeat}}
          <div class="user-settings__buttons">{{buttonSavePassword}}</div>
        </form>
      </div>
    </div>
  </div>
</div>
`
