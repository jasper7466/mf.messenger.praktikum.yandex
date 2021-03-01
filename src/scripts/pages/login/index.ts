import { template, data } from './index.tmpl.js';
import Button from '../../../components/button/index.js';
import FormValidator from '../../modules/FormValidator.js'

const checks = {
    login: [
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    password: [FormValidator.CHECKS.REQUIRED]
}

const holder = document.querySelector('.application');
const button = new Button({ link: './chat-select.html', caption: 'Авторизоваться', type: 'submit'});

if (button.element)
    Handlebars.registerPartial('button', button.element.innerHTML);

if (holder)
    holder.innerHTML = Handlebars.compile(template)(data);

const form: HTMLElement | null = document.querySelector('.form');

if (form)
    new FormValidator(form, checks);