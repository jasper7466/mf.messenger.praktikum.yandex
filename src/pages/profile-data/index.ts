import { template } from './index.tmpl';
import Button from '../../components/button/index';
import FormValidator from '../../modules/FormValidator';
import { Component } from "../../modules/Component";

const checks = {
    email: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.EMAIL
    ],
    login: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    first_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    second_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    display_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    phone: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PHONE,
    ]
}

export class ProfileDataPage extends Component {
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




