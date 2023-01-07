export default `
<div class="chatItem">
    <div class="chatItem__avatar">
        <div data-element="avatar"></div>
    </div>
    <div class="chatItem__content">
        <p class="chatItem__name text-m">{{ name }}</p>
        <p class="chatItem__message text-s">{{ lastMessage }}</p>
    </div>
    <div class="chatItem__right">
        <p class="chatItem__time text-xxs">{{ time }}</p>
        <div class="chatItem__label">
            <div class="chatItem__label-text text-xs text-white">{{ countUnReading }}</div>
        </div>
    </div>
</div>`;
