import { template, data } from './index.tmpl.js';
import Button from '../../../components/button/index.js';
import FormValidator from '../../modules/FormValidator.js';

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