export default `
  <div class="chat__header">
    {{avatar}}
    <p class="text-m">Maxim</p>
    <div class="chat__moreButton">{{ moreButton }}</div>
  </div>
  <div class="chat__content">{{image}} {{text}} {{file}}</div>
  <form class="chat__footer footer js-message-input">
    <div class="footer__clip"></div>
    <input
      class="footer__input"
      type="text"
      placeholder="Write a message"
      name="message"
    />
    {{ arrowButton }}
    <!-- <p class="text-s chat__placeholder">Select a chat to send a message</p> -->
  </form>
`
