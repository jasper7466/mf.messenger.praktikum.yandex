import { template } from './index.tmpl';
import Button from '../../../components/button/index';
import FormValidator from '../../modules/FormValidator';
import { Component } from "../../modules/Component";

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
        super(props);
    }

    render(context: any) {
        return Handlebars.compile(template)(context);
    }
}