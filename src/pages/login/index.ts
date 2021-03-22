import { template } from './index.tmpl';
import Button from '../../components/button/index';
import FormValidator from '../../modules/FormValidator'
import { Component } from "../../modules/Component";

const checks = {
    login: [
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    password: [FormValidator.CHECKS.REQUIRED]
}

export class LoginPage extends Component {
    constructor(props: any) {
        const button = new Button({ link: './chat-select.html', caption: 'Авторизоваться', type: 'submit'});
        const form: HTMLElement | null = document.querySelector('.form');
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        if (form)
            new FormValidator(form, checks);
        super(props);
    }

    render(context: any) {
        return Handlebars.compile(template)(context);
    }
}