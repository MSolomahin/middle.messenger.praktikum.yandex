export default `
<div class="chat-item">
    <div class="chat-item__avatar">
        <div data-element="avatar"></div>
    </div>
    <div class="chat-item__content">
        <p class="chat-item__name text-m">{{ name }}</p>
        <p class="chat-item__message text-s">{{ lastMessage }}</p>
    </div>
    <div class="chat-item__right">
        <p class="chat-item__time text-xxs">{{ time }}</p>
        <div class="chat-item__label">
            <div class="chat-item__label-text text-xs text-white">{{ countUnReading }}</div>
        </div>
    </div>
</div>`
