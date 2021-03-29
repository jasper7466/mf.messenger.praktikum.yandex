import SETTINGS from "../../config";

export const template =`
    <section class="side-container chat-list">
        <div class="chat-list__header">
            <a class="link link_color_sub-color link_size_medium chat-list__profile-link" href="./profile.html">
                Профиль&ensp;
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L3 3L1 1" stroke="#999999"/>
                </svg>
            </a>
            <input class="chat-list__find" type="text" name="search" id="search" placeholder="Поиск" autocomplete="off">
        </div>
        <ul class="chat-list__list">
            {{#each this.chats}}
                <li class="chat-list__item">
                    <div class="avatar avatar_mini">
                        <img class="avatar__image" src={{image}} alt="Аватар чата">
                    </div>
                    <p class="chat-caption">{{name}}</p>
                    <p class="chat-list__last-reply">{{last}}</p>
                    <time class="timestamp" datetime={{datetime}}>{{time}}</time>
                    <div class="chat-list__unreads-counter">{{unreads}}</div>
                </li>
                <!-- TODO: Пустой span-line не отображается при overflow-y: scroll. Пока что заполнен &nbsp;-->
                <span class="span-line">&nbsp;</span>
            {{/each}}
        </ul>
    </section>
    <section class="side-container chat">
        <div class="chat__header">
            <div class="avatar avatar_micro">
                <img class="avatar__image" src={{chat.image}} alt="Аватар чата">
            </div>
            <p class="chat-caption">{{chat.name}}</p>
            <button class="round-button round-button_type_options"></button>
        </div>
        <div class="chat__feed">        
            {{#each chat.feed}}
                <p class="chat__message
                    {{#if attachmentType}}
                        chat__message_type_other
                    {{else}}
                        chat__message_type_text
                    {{/if}}
                    
                    {{#if isOwner}}
                        chat__message_owner
                        {{#if isRead}}
                            chat__message_status_viewed
                        {{/if}}
                    {{/if}}
                 "
                >
                    {{text}}
                    {{#if attachmentType}}
                        <img src={{attachmentSource}} alt="Изображение в сообщении">
                    {{/if}}    
                    <time class="timestamp" datetime={{datetime}}>{{time}}</time>
                </p>
            {{/each}}
        </div>
        <div class="chat__sender">
            <button class="round-button round-button_type_attachment"></button>
            <input class="chat__sender-input" type="text" placeholder="Сообщение">
            <button class="round-button round-button_type_send"></button>
        </div>
    </section>
`;

export const data = {
    chats: [
        {
            image: '../images/avatar-dummy.png',
            name: 'User-name',
            last: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            datetime: '2000-01-01 10:49',
            time: '10:49',
            unreads: 1
        }
    ],
    chat: {
        image: '../images/avatar-dummy.png',
        name: 'User-name',
        feed: [
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida dui quis eros iaculis, eget posuere enim luctus. Morbi sed dapibus turpis. Phasellus condimentum quam vel risus elementum, ut cursus nisi varius. Donec non consequat tortor. Maecenas venenatis tincidunt turpis, eu viverra felis rhoncus in. Morbi at imperdiet augue. Integer urna tortor, laoreet nec vestibulum eget, venenatis eu purus. Nulla ullamcorper justo eget tortor vulputate ultrices. Aliquam euismod vel orci ut eleifend.',
                attachmentType: undefined,
                attachmentSource: undefined,
                datetime: '2000-01-01 10:49',
                time: '10:49',
                isOwner: false,
                isRead: true
            },
            {
                text: '',
                attachmentType: 'img',
                attachmentSource: SETTINGS.avatarDummy,
                datetime: '2000-01-01 10:49',
                time: '10:49',
                isOwner: false,
                isRead: true
            },
            {
                text: 'Lorem ipsum.',
                attachmentType: undefined,
                attachmentSource: undefined,
                datetime: '2000-01-01 10:49',
                time: '10:49',
                isOwner: true,
                isRead: true
            },
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida dui quis eros iaculis, eget posuere enim luctus. Morbi sed dapibus turpis. Phasellus condimentum quam vel risus elementum, ut cursus nisi varius. Donec non consequat tortor. Maecenas venenatis tincidunt turpis, eu viverra felis rhoncus in. Morbi at imperdiet augue. Integer urna tortor, laoreet nec vestibulum eget, venenatis eu purus. Nulla ullamcorper justo eget tortor vulputate ultrices. Aliquam euismod vel orci ut eleifend.',
                attachmentType: undefined,
                attachmentSource: undefined,
                datetime: '2000-01-01 10:49',
                time: '10:49',
                isOwner: false,
                isRead: true
            },
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida dui quis eros iaculis, eget posuere enim luctus. Morbi sed dapibus turpis. Phasellus condimentum quam vel risus elementum, ut cursus nisi varius. Donec non consequat tortor. Maecenas venenatis tincidunt turpis, eu viverra felis rhoncus in. Morbi at imperdiet augue. Integer urna tortor, laoreet nec vestibulum eget, venenatis eu purus. Nulla ullamcorper justo eget tortor vulputate ultrices. Aliquam euismod vel orci ut eleifend.',
                attachmentType: undefined,
                attachmentSource: undefined,
                datetime: '2000-01-01 10:49',
                time: '10:49',
                isOwner: false,
                isRead: true
            }
        ]
    }
};