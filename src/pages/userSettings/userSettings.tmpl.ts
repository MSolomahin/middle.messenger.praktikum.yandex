export default `
<div class="user-settings">
  <div class="user-settings__container">
    <div class="user-settings__comeback comeback">
      <a class="comeback__icon" href="/"> </a>
    </div>
    <div class="user-settings__main">
      <div class="user-settings__content">
        <div class="user-settings__avatar avatar">
          {{avatar}}
          <h2 class="text-xl">Maxim</h2>
        </div>
        <div class="user-settings__userInfo">
          {{inputEmail}} {{inputLogin}} {{inputFirstName}} {{inputSecondName}}
          {{inputDisplayName}} {{inputPhone}}
        </div>
        <div class="user-settings__buttons js-userSettings">
          {{buttonChangeInfo}}
          <div class="separatop"></div>
          {{buttonChangePassword}}
          <div class="separatop"></div>
          {{buttonLogOut}}
        </div>
        <div class="user-settings__buttons js-userSettings hidden">
          {{buttonSave}}
        </div>
      </div>
    </div>
  </div>
</div>
`
