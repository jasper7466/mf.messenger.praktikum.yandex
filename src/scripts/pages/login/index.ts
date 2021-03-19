import { template, data } from './index.tmpl.js';
import Button from '../../../components/button/index.js';
import FormValidator from '../../modules/FormValidator.js'
import { Component } from "../../modules/Component.js";

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



        super('div', props);
    }

    render() {
        return Handlebars.compile(template)(data);
    }
}