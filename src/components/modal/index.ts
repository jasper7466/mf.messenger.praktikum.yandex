import { template } from "./template";
import Component from "../../modules/Component";
import Button from "../button/index";

export default class FileUploadModal extends Component {
    constructor(props: any, storePath: string | null = null) {
        const button = new Button({caption: 'Поменять', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        super(props, storePath);
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }
}