import { template } from './index.tmpl';
import { Component } from "../../modules/Component";

export class ChatMainPage extends Component {
    constructor(props: any) {
        super(props);
    }

    render(context: any) {
        return Handlebars.compile(template)(context);
    }
}