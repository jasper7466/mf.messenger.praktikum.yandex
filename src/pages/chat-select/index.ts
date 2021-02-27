import { template, data } from './index.tmpl.js';

const holder = document.querySelector('.application');

Handlebars.registerHelper('repeat', function(n: number, block: any) {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


if (holder)
    holder.innerHTML = Handlebars.compile(template)(data);

