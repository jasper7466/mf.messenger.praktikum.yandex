import { template } from './index.tmpl';
import Button from '@components/button/index';
import Component from "@modules/Component";
import FormValidator from "@modules/FormValidator";
import {passwordValidationRules as checks, storeMap} from "@/config";
import controller from "./controller";

const validator = new FormValidator(checks);
validator.setDataHandler(controller.changeProfilePassword.bind(controller));

export class ProfilePasswordPage extends Component {
    constructor(props: any) {
        const button = new Button({caption: 'Сохранить', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        controller.setDefaultProps(props);
        super(props, storeMap.profilePageProps);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    beforeCompile() {
        validator.detach();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    afterCompile() {
        try {
            if (this.element)
                validator.attach(this.element, '.profile-form')
        } catch (e) {
            console.log(e);
        }

    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        if (target.closest('.go-back-link'))
            controller.back();
    }
}
