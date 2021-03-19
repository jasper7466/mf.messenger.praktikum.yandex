import template from "./template";
import { Component } from "../../scripts/modules/Component";

export default class Button extends Component {
    constructor(props: object) {
        super('button', props);
    }

    render() {
        return template;
    }
}