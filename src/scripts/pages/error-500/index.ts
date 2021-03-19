import { template, data } from './index.tmpl';
import { Component } from "../../modules/Component";

export class Error500Page extends Component {
    constructor(props: any) {
        super('div', props);
    }

    render() {
        return Handlebars.compile(template)(data);
    }
}