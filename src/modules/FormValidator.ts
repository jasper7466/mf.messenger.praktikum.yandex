export default class FormValidator {
    static CHECKS = {
        MIN_LENGTH: {
            exp: /^[a-zа-яё0-9_-]{3,}$/,
            err: 'Минимальная длина - 3 символа'
        },
        MAX_LENGTH: {
            exp: /^[a-zA-Zа-яА-ЯёЁ0-9_-]{0,25}$/,
            err: 'Максимальная длина - 25 символов'
        },
        ALPHABETIC: {
            exp: /^[a-zA-Zа-яА-ЯёЁ-]*$/,
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
            USE_LOWER_CASE: {
                exp: /(?=.*[a-z])/,
                err: 'Используйте хотя бы одну строчную букву'
            },
            USE_UPPER_CASE: {
                exp: /(?=.*[A-Z])/,
                err: 'Используйте хотя бы одну заглавную букву'
            },
            USE_NUMERIC: {
                exp: /(?=.*[0-9])/,
                err: 'Используйте хотя бы одну цифру'
            },
            MIN_LENGTH_8: {
                exp: /(?=.{8,})/,
                err: 'Пароль должен быть не короче 8 символов'
            }
        }
    }

    static readonly inputEvents = ['blur', 'keydown', 'keyup'];

    protected _form: Element | null;
    protected _inputs: NodeListOf<any> | null;
    protected _dataHandler: Function | null = null;

    constructor(protected readonly _rules: any) {}

    public attach(root: Element, selector: string) {
        let form = root.querySelector(selector);
        if (!form)
            throw new Error(`${this.constructor.name}: Form "${selector}" not found`);
        let inputs = form.querySelectorAll('input');
        if (inputs.length === 0)
            throw new Error(`${this.constructor.name}: Form "${selector}" has no input fields`);
        this._form = form;
        this._inputs = inputs;
        this._bindListeners();
    }

    public detach() {
        this._unbindListeners();
        this._form = null;
        this._inputs = null;
    }

    public setDataHandler(callback: Function): void {
        this._dataHandler = callback;
    }

    protected _handle() {
        let data: any = {};
        if (!(this._inputs && this._dataHandler))
            return;
        this._inputs.forEach(input => data[input.name] = input.value);
        this._dataHandler(data);
    }

    protected _bindListeners() {
        if (!(this._inputs && this._form))
            return;
        FormValidator.inputEvents.forEach(event => {
            // @ts-ignore
            this._inputs.forEach((input: HTMLElement) => input.addEventListener(`${event}`, this._validate.bind(this)));
        });
        this._form.addEventListener('submit', this._submitHandler.bind(this));
    }

    protected _unbindListeners() {
        if (!(this._inputs && this._form))
            return;
        FormValidator.inputEvents.forEach(event => {
            // @ts-ignore
            this._inputs.forEach((input: HTMLElement) => input.removeEventListener(`${event}`, this._validate.bind(this)));
        });
        this._form.removeEventListener('submit', this._submitHandler.bind(this));
    }

    protected _validate(event: { target: HTMLInputElement } ) {
        const input = event.target;
        if (!this._rules.hasOwnProperty(input.name))
            return true;

        let errorField = null;

        if (input.parentNode)
            errorField = input.parentNode.querySelector('.form__error');

        let err: string | null = null;

        this._rules[input.name].forEach((rule: Record<string, string>) => {
            const regExp = new RegExp(rule.exp);
            if (!regExp.test(input.value))
                err = rule.err;
        });

        if (err) {
            if (errorField) {
                errorField.textContent = err;
                errorField.classList.remove('form__error_hidden');
            }
            return false;
        }

        if (errorField)
            errorField.classList.add('form__error_hidden');
        return true;
    }

    protected _submitHandler(event: Event)
    {
        event.preventDefault();
        if (!this._inputs)
            return;
        let isValid = true;
        this._inputs.forEach((input: HTMLElement) => {
            const pseudoEvent: any = {target: input};
            if (!this._validate(pseudoEvent))
                isValid = false;
        });
        if (isValid)
            this._handle();
    }
}