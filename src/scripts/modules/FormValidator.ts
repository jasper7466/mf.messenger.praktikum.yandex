export default class FormValidator {
    static CHECKS = {
        MIN_LENGTH: {
            exp: /^[a-zа-яё0-9_-]{3,}$/,
            err: 'Минимальная длина - 3 символа'
        },
        MAX_LENGTH: {
            exp: /^[a-zа-яё0-9_-]{0,25}$/,
            err: 'Максимальная длина - 25 символов'
        },
        ALPHABETIC: {
            exp: /^[a-zа-яё-]*$/,
            err: 'Только буквы'
        },
        ALPHANUMERIC: {
            exp: /^[a-zа-яё0-9_-]*$/,
            err: 'Недопустимые символы'
        },
        REQUIRED: {
            exp: /^.{1,}$/,
            err: 'Не может быть пустым'
        },
        EMAIL: {
            exp: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            err: 'Недопустимый формат email'
        },
        PHONE: {
            exp: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
            err: 'Недопустимый формат номера'
        },
        PASSWORD_STRENGTH: {
            exp: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
            err: 'Слишком простой пароль'
        }
    }

    protected readonly _form: HTMLElement;
    protected readonly _rules: object;
    protected readonly _inputs: NodeListOf<HTMLElement>;

    constructor(form: HTMLElement, rules: object) {
        this._form = form;
        this._rules = rules;
        this._inputs = form.querySelectorAll('input');
        this.bindListeners();
    }

    protected bindListeners() {
        this._inputs.forEach((input: HTMLElement) => input.addEventListener('blur', this._validate.bind(this)));
        this._inputs.forEach((input: HTMLElement) => input.addEventListener('focus', this._validate.bind(this)));
        this._form.addEventListener('submit', this._submitHandler.bind(this));
    }

    protected _validate(event: { target: HTMLInputElement } ) {
        const input = event.target;
        if (!this._rules.hasOwnProperty(input.name))
            return;

        if (!input.parentNode)
            return;

        const errorField = input.parentNode.querySelector('.form__error');

        if (!errorField)
            return;

        let err: string | null = null;

        this._rules[input.name].forEach((rule: Record<string, string>) => {
            const regExp = new RegExp(rule.exp);
            if (!regExp.test(input.value))
                err = rule.err;
        });

        if (err) {
            errorField.textContent = err;
            errorField.classList.remove('form__error_hidden');
        }
        else
            errorField.classList.add('form__error_hidden');
    }

    protected _submitHandler()
    {
        this._inputs.forEach((input: HTMLElement) => {
            const pseudoEvent: any = {target: input};
            this._validate(pseudoEvent)
        });
    }
}