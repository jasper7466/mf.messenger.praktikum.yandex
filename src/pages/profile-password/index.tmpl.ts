export const template =`
        <!-- TODO: заменить <a> на <button> -->
        <button class="side-button side-button_type_left go-back-link">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
                <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
                <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
            </svg>
        </button>
        <div class="side-container side-container_type_profile">
            <!-- Блок аватара -->
            <div class="avatar-block">
                <div class="avatar">
                    <img class="avatar__image" src={{avatar}} alt="Аватар профиля">
                    <div class="avatar__banner avatar__banner_inactive">
                        <div class="avatar__banner-back"></div>
                        <p class="avatar__banner-text">Поменять аватар</p>
                    </div>
                </div>
                <p class="avatar-block__title avatar-block__title_hidden">First_name</p>
            </div>
            <!-- Форма данных аккаунта -->
            <section class="settings-section">
                <form class="profile-form profile-form_disabled" id="profile-password">
                    {{#each fields}}
                        <span class="linear-container linear-container_type_underlined">
                            <label class="profile-form__label" for={{name}}>{{description}}</label>
                            <span class="form__error"></span>
                            <input class="profile-form__input" type={{type}} name={{name}} id={{name}}>
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
        { name: 'oldPassword', type: 'password', description: 'Старый пароль', value: 'Старый пароль' },
        { name: 'newPassword', type: 'password', description: 'Новый пароль', value: 'Новый пароль' },
        { name: 'verifyPassword', type: 'password', description: 'Повторите новый пароль', value: 'Повторите новый пароль' }
    ]
};