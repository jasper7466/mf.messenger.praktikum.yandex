export const template =`
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
                <div class="avatar__banner">
                    <div class="avatar__banner-back"></div>
                    <p class="avatar__banner-text">Поменять аватар</p>
                </div>
            </div>
            <p class="avatar-block__title">{{first_name}}</p>
        </div>
        <!-- Форма данных аккаунта -->
        <section class="settings-section">
            <form class="profile-form profile-form_disabled">
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="email">Почта</label>
                    <input class="profile-form__input" readonly="readonly" type="text" name="email" id="email" placeholder="Почта" value={{email}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="login">Логин</label>
                    <input class="profile-form__input" readonly="readonly" type="text" name="login" id="login" placeholder="Логин" value={{login}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="first_name">Имя</label>
                    <input class="profile-form__input" readonly="readonly" type="text" name="first_name" id="first_name" placeholder="Имя" value={{first_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="second_name">Фамилия</label>
                    <input class="profile-form__input" readonly="readonly" type="text" name="second_name" id="second_name" placeholder="Фамилия" value={{second_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="display_name">Отображаемое имя</label>
                    <input class="profile-form__input" readonly="readonly" type="text" name="display_name" id="display_name" placeholder="Отображаемое имя" value={{display_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="phone">Телефон</label>
                    <input class="profile-form__input" readonly="readonly" type="tel" name="phone" id="phone" placeholder="Телефон" value={{phone}}>
                </span>
            </form>
        </section>
        <!--  Блок выбора действия -->
        <section class="settings-section">
            <span class="linear-container linear-container_type_underlined">
                <a class="link edit-profile-link">Изменить данные</a>
            </span>
            <span class="linear-container linear-container_type_underlined">
                <a class="link edit-password-link">Изменить пароль</a>
            </span>
            <span class="linear-container linear-container_type_underlined">
                <a class="link link_color_dangerous logout-link">Выйти</a>
            </span>
        </section>
    </div>
`;

export const data = {
    avatar: '../images/avatar-dummy.png',
    first_name: 'First_name',
};