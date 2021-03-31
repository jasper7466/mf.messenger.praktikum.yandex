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
            <p class="avatar-block__title avatar-block__title_hidden">First_name</p>
        </div>
        <!-- Форма данных аккаунта -->
        <section class="settings-section">
            <form class="profile-form profile-form_disabled" id="profile-data">
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="email">Почта</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="text" name="email" id="email" placeholder="Почта" value={{email}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="login">Логин</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="text" name="login" id="login" placeholder="Логин" value={{login}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="first_name">Имя</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="text" name="first_name" id="first_name" placeholder="Имя" value={{first_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="second_name">Фамилия</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="text" name="second_name" id="second_name" placeholder="Фамилия" value={{second_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="display_name">Отображаемое имя</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="text" name="display_name" id="display_name" placeholder="Отображаемое имя" value={{display_name}}>
                </span>
                <span class="linear-container linear-container_type_underlined">
                    <label class="profile-form__label" for="phone">Телефон</label>
                    <span class="form__error"></span>
                    <input class="profile-form__input" type="tel" name="phone" id="phone" placeholder="Телефон" value={{phone}}>
                </span>
                <section class="settings-section">
                    {{> saveButton}}
                </section>
            </form>
        </section>
    </div>
    <section class="modal">
        <form class="form avatar-form">
            <h1 class="form__header">Загрузите файл</h1>
            Выбрать файл на компьютере
            <input class="form__link" id="avatar" type="file" accept="image/*">
            {{> changeButton}}
        </form>
    </section>
`;

export const data = {
    avatar: '../images/avatar-dummy.png',
    first_name: 'First_name',
};