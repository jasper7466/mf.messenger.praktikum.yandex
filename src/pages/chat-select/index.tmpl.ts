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
                    <!-- TODO: заменить <a> на <li> -->
                    <a href="./chat-main.html" class="chat-list__item">
                        <div class="avatar avatar_mini">
                            <img class="avatar__image" src={{image}} alt="Аватар чата">
                        </div>
                        <p class="chat-caption">{{name}}</p>
                        <p class="chat-list__last-reply">{{last}}</p>
                        <time class="timestamp" datetime={{datetime}}>{{time}}</time>
                        <div class="chat-list__unreads-counter">{{unreads}}</div>
                    </a>
                    <span class="span-line">&nbsp;</span>
                {{/each}}
            </ul>
        </section>
        <section class="side-container side-container_type_centered">
            Выберите чат чтобы отправить сообщение
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
    ]
};