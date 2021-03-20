import template from "./template";
import { Component } from "../../scripts/modules/Component";

export default class Button extends Component {
    constructor(props: object) {
        super(props);
    }

    render(context: any) {
        return Handlebars.compile(template)(context);
    }
}