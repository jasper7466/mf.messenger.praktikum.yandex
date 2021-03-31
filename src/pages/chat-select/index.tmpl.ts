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
    
    <!-- Окно чата, чат не выбран -->
    <section class="side-container side-container_type_centered no-chat-selected">
    Выберите чат чтобы отправить сообщение
    </section>
    
    <!-- Окно чата, чат выбран -->
    <section class="side-container chat side-container_hidden">
        <div class="chat__header">
            <div class="avatar avatar_micro">
                <img class="avatar__image" src={{chat.image}} alt="Аватар чата">
            </div>
            <p class="chat-caption">{{chat.name}}</p>
            <button class="round-button round-button_type_options chat-options-button"></button>
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
    
    <!-- Модальное окно добавления чата -->
    <section class="modal new-chat-modal">
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
    
    <!-- Модальное окно меню чата -->
    <section class="modal chat-menu-modal">
        <form class="form new-chat-form">
            <h1 class="form__header">Чат</h1>
            <a class="form__link add-user-link">Добавить пользователя</a>
            <a class="form__link remove-user-link">Удалить пользователя</a>
        </form>
    </section>
    
    <!-- Модальное окно добавления пользователя -->
    <section class="modal add-user-modal">
        <form class="form add-user-form">
            <h1 class="form__header">Добавить пользователя</h1>
            <div class="form__field-container">
                <span class="form__error"></span>
                <label class="form__label" for="login">Логин</label>
                <input class="form__input" type="text" name="login" id="login" placeholder="Логин">
            </div>
            <section class="settings-section">
                {{> addUserButton}}
            </section>
        </form>
    </section>
    
    <!-- Модальное окно удаления пользователя -->
    <section class="modal remove-user-modal">
        <form class="form remove-user-form">
            <h1 class="form__header">Удалить пользователя</h1>
            <div class="form__field-container">
                <span class="form__error"></span>
                <label class="form__label" for="login">Логин</label>
                <input class="form__input" type="text" name="login" id="login" placeholder="Логин">
            </div>
            <section class="settings-section">
                {{> removeUserButton}}
            </section>
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