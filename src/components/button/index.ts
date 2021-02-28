import template from "./template.js";
import { Component } from "../../scripts/modules/Component.js";

export default class Button extends Component {
    constructor(props: object) {
        super('button', props);
    }

    render() {
        return template;
    }
}