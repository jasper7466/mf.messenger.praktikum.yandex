import { template, data } from './index.tmpl.js';
import Button from '../../../components/button/index.js';
import FormValidator from '../../modules/FormValidator.js';

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

const holder = document.querySelector('.application');
const button = new Button({
    link: './profile.html',
    caption: 'Сохранить',
    type: 'submit'
});

if (button.element)
    Handlebars.registerPartial('button', button.element.innerHTML);

if (holder)
    holder.innerHTML = Handlebars.compile(template)(data);

const form: HTMLElement | null = document.querySelector('.form');

if (form)
    new FormValidator(form, checks);