import { template, data } from './index.tmpl.js';
import Button from '../../components/button/index.js';

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