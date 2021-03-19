import { template, data } from './index.tmpl.js';
import { Component } from "../../modules/Component.js";

export class Error404Page extends Component {
    constructor(props: any) {
        super('div', props);
    }

    render() {
        return Handlebars.compile(template)(data);
    }
}