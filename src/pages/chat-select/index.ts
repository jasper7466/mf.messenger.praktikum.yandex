import {template} from "./index.tmpl";
import Component from "../../modules/Component";
import {storeMap} from "../../config";
import controller from "./controller";

export class ChatSelectPage extends Component {
    constructor(props: any) {
        super(props, storeMap.chatsList);
        controller.updateChats();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }
}