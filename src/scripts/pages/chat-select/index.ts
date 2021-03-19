import { template, data } from './index.tmpl';
import { Component } from "../../modules/Component";

export class ChatSelectPage extends Component {
    constructor(props: any) {
        super('div', props);
    }

    render() {
        return Handlebars.compile(template)(data);
    }
}