import { template, data } from './index.tmpl.js';
import Button from '../../../components/button/index.js';
import FormValidator from '../../modules/FormValidator.js';
import { Component } from "../../modules/Component.js";

const checks = {
    oldPassword: [
        FormValidator.CHECKS.REQUIRED,
    ],
    newPassword: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH,
    ],
    verifyPassword: [
        FormValidator.CHECKS.REQUIRED
    ]
}

export class ProfilePasswordPage extends Component {
    constructor(props: any) {
        const button = new Button({
            link: './profile.html',
            caption: 'Сохранить',
            type: 'submit'
        });
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        const form: HTMLElement | null = document.querySelector('.form');
        if (form)
            new FormValidator(form, checks);
        super('div', props);
    }

    render() {
        return Handlebars.compile(template)(data);
    }
}