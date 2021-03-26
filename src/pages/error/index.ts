import { template } from './index.tmpl';
import ErrorBanner from '../../components/errorBanner/index';
import Component from '../../modules/Component';
import { storeMap } from '../../config';

type Partial = {
    name: string,
    component: Component
}

const partials: Partial[] = [];

export class ErrorPage extends Component {
    constructor(props: any) {
        const errorBanner = new ErrorBanner({type: 'Тип ошибки', description: 'Описание ошибки'}, storeMap.errorPageProps);
        partials.push({name: 'errorBanner', component: errorBanner});
        super(props);
        errorBanner.bindParent(this);
    }

    compile(context: any) {
        partials.forEach( partial => {
            if (partial.component.element)
                Handlebars.registerPartial(partial.name, partial.component.element.innerHTML);
        })
        return Handlebars.compile(template)(context);
    }
}