export const template =`
    <!-- TODO, FIXME: заменить <a> на <button> (временная реализация для кликабельности прототипа) -->
    <a href="./profile.html" class="side-button side-button_type_left">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
            <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
            <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
        </svg>
    </a>
    <div class="side-container side-container_type_profile">
        <!-- Блок аватара -->
        <div class="avatar-block">
            <div class="avatar">
                <img class="avatar__image" src={{image}} alt="Аватар профиля">
                <div class="avatar__banner">
                    <div class="avatar__banner-back"></div>
                    <p class="avatar__banner-text">Поменять аватар</p>
                </div>
            </div>
            <p class="avatar-block__title avatar-block__title_hidden">First_name</p>
        </div>
        <!-- Форма данных аккаунта -->
        <section class="settings-section">
            <form class="form profile-form profile-form_disabled" id="profile-data">
                {{#each fields}}
                    <span class="linear-container linear-container_type_underlined">
                        <label class="profile-form__label" for={{name}}>{{description}}</label>
                        <input class="profile-form__input" type={{type}} name={{name}} id={{name}} placeholder={{value}}>
                    </span>
                {{/each}}
                <section class="settings-section">
                    {{> button}}
                </section>
            </form>
        </section>
    </div>
`;

export const data = {
    image: '../images/avatar-dummy.png',
    name: 'First_name',
    fields: [
        { name: 'email', type: 'text', description: 'Почта', value: 'Почта' },
        { name: 'login', type: 'text', description: 'Логин', value: 'Логин' },
        { name: 'first_name', type: 'text', description: 'Имя', value: 'Имя' },
        { name: 'second_name', type: 'text', description: 'Фамилия', value: 'Фамилия' },
        { name: 'display_name', type: 'text', description: 'Имя в чате', value: 'Имя_в_чате' },
        { name: 'phone', type: 'tel', description: 'Телефон', value: 'Телефон' }
    ]
};