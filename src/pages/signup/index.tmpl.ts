export const template =`
<form class="form form_type_register">
    <h1 class="form__header">Регистрация</h1>
    {{#each fields}}
        <div class="form__field-container">
            <span class="form__error"></span>
            <input class="form__input" type={{type}} name={{name}} id={{name}} placeholder={{description}}>
            <label class="form__label" for={{name}}>{{description}}</label>
        </div>
    {{/each}}
    {{> button}}
    <a class="form__link sign-in-link">Войти</a>
</form>
`;

export const data = {
    fields: {
        email: {
            name: 'email',
            type: 'email',
            description: 'Почта'
        },
        login: {
            name: 'login',
            type: 'text',
            description: 'Логин'
        },
        first: {
            name: 'first_name',
            type: 'text',
            description: 'Имя'
        },
        second: {
            name: 'second_name',
            type: 'text',
            description: 'Фамилия'
        },
        phone: {
            name: 'phone',
            type: 'tel',
            description: 'Телефон'
        },
        password: {
            name: 'password',
            type: 'password',
            description: 'Пароль'
        },
        verify: {
            name: 'verify_password',
            type: 'password',
            description: 'Пароль (ещё раз)'
        }
    }
};
