export default `
<div class="setting-main__body">
    <div class="setting-main__userInfo-form">
      {{inputEmail}} {{inputLogin}} {{inputFirstName}} {{inputSecondName}}
      {{inputDisplayName}} {{inputPhone}}
      <div class="setting-main__buttons js-userSettings">
        {{buttonChangeInfo}}
        {{buttonChangePassword}}
        {{buttonLogOut}}
      </div>
      <div class="setting-main__buttons js-userSettings">
        {{buttonSaveInfo}}
      </div>
    </div>
  </div>
`
