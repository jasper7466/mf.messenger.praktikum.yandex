export const template =`
<form class="form form_type_auth">
    <h1 class="form__header">Вход</h1>
    {{#each fields}}
        <div class="form__field-container">
            <span class="form__error"></span>
            <input class="form__input" type={{type}} name={{name}} id={{name}} placeholder={{description}}>
            <label class="form__label" for={{name}}>{{description}}</label>
        </div>
    {{/each}}
    {{> button}}
    <a class="form__link" href="./signup.html">Нет аккаунта?</a>
</form>
`;

export const data = {
    fields: {
        login: {
            name: 'login',
            type: 'text',
            description: 'Логин'
        },
        password: {
            name: 'password',
            type: 'password',
            description: 'Пароль'
        }
    }
};