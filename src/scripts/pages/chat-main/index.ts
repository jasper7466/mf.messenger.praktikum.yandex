import { template, data } from './index.tmpl.js';

const holder = document.querySelector('.application');

if (holder)
    holder.innerHTML = Handlebars.compile(template)(data);

