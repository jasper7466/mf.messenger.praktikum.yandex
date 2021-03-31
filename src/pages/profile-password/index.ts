import { template } from './index.tmpl';
import Button from '../../components/button/index';
// import FormValidator from '../../modules/FormValidator';
import Component from "../../modules/Component";
import FormValidator from "../../modules/FormValidator";
import {passwordValidationRules as checks, storeMap} from "../../config";
import controller from "./controller";

const validator = new FormValidator(checks);
validator.setDataHandler(controller.changeProfilePassword.bind(controller));

export class ProfilePasswordPage extends Component {
    constructor(props: any) {
        const button = new Button({caption: 'Сохранить', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        super(props, storeMap.profilePageProps);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    componentDidUpdate() {
        validator.detach();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    compiled() {
        if (this.element)
            validator.attach(this.element, '.profile-form')
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        if (target.closest('.go-back-link'))
            controller.back();
    }
}