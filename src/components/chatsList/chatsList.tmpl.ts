export default `
<div class="chats__header">
  <div class="chats__userInfo">
    {{ avatar }}
    <p class="text-s">Maxim</p>
  </div>
  <a href="/userSettings">
    <p class="text-s">Profile ></p>
  </a>
</div>
<div class="chats__search"></div>
<div class="chats__list">{{ chatList }}</div>
`
