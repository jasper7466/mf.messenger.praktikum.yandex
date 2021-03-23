import { template } from './index.tmpl';
import ErrorBanner from '../../components/errorBanner/index';
import { Component } from "../../modules/Component";

type Partial = {
    name: string,
    component: Component
}

const partials: Partial[] = [];

export class ErrorPage extends Component {
    constructor(props: any) {
        const errorBanner = new ErrorBanner({ type: 'Тип ошибки', description: 'Описание ошибки'});
        partials.push({name: 'errorBanner', component: errorBanner});
        super(props);
    }

    render(context: any) {
        partials.forEach( partial => {
            if (partial.component.element)
                Handlebars.registerPartial(partial.name, partial.component.element.innerHTML);
        })
        return Handlebars.compile(template)(context);
    }
}