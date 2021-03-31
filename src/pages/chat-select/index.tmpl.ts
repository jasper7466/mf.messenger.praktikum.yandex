export const template =`
    <!-- Список чатов -->
    <section class="side-container chat-list">
        <div class="chat-list__header">
            <a class="link link_color_sub-color link_size_medium chat-list__profile-link go-profile-link">
                Профиль&ensp;
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L3 3L1 1" stroke="#999999"/>
                </svg>
            </a>
            <input class="chat-list__find" type="text" name="search" id="search" placeholder="Поиск" autocomplete="off">
        </div>
        <ul class="chat-list__list">
            {{#each this.chats}}
                <li class="chat-list__item" data-id={{id}}>
                    <div class="avatar avatar_mini">
                        <img class="avatar__image" src={{avatar}} alt="Аватар чата">
                    </div>
                    <p class="chat-caption">{{title}}</p>
                    <p class="chat-list__last-reply">{{last}}</p>
                    <time class="timestamp" <!--datetime=datetime-->>{{time}}</time>
                    <div class="chat-list__unreads-counter">{{unreads}}</div>
                </li>
                <span class="span-line">&nbsp;</span>
            {{/each}}
        </ul>
        {{> addChatButton}}
    </section>
    <!-- Окно чата -->
    <section class="side-container side-container_type_centered">
    Выберите чат чтобы отправить сообщение
    </section>
    <!-- Модальное окно -->
    <section class="modal">
        <form class="form new-chat-form">
            <h1 class="form__header">Создать чат</h1>
            <form class="profile-form profile-form_disabled" id="profile-data">
                <div class="form__field-container">
                    <span class="form__error"></span>
                    <label class="form__label" for="title">Название</label>
                    <input class="form__input" type="text" name="title" id="title" placeholder="Название чата">
                </div>
                <section class="settings-section">
                    {{> submitNewChatButton}}
                </section>
            </form>
        </form>
    </section>
`;

export const data = {
    chats: [
        {
            avatar: '../images/avatar-dummy.png',
            title: 'User-name',
            last: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            time: '10:49',
            unreads: 1
        }
    ]
};