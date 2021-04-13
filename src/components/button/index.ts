import template from "./template";
import Component from "@modules/Component";

export default class Button extends Component {
    constructor(props: Record<string, any>) {
        super(props);
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }
}