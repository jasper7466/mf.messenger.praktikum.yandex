export const template =`
    <form class="form form_modal">
        <h1 class="form__header">{{header}}</h1>
            <div class="form__field-container">
                <span class="form__error"></span>
                <input class="form__input" type={{type}} name={{name}} id={{name}} placeholder={{description}}>
                <label class="form__label" for={{name}}>{{description}}</label>
            </div>
        {{> button}}
        <a class="form__link register-link">Нет аккаунта?</a>
    </form>
`;