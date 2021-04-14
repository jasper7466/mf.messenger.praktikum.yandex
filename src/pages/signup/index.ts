import { template } from "./index.tmpl";
import Button from "@components/button/index";
import FormValidator from "@modules/FormValidator";
import Component from "@modules/Component";
import controller from "./controller";
import {Routes} from "@/index";
import {profileValidationRules as checks} from "../../config";

const validator = new FormValidator(checks);
validator.setDataHandler(controller.signUp.bind(controller));

export class SignupPage extends Component {
    constructor(props: any) {
        const button = new Button({caption: 'Зарегистрироваться', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        super(props);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    compiled() {
        if (this.element)
            validator.attach(this.element, '.form')
    }

    componentDidUpdate() {
        validator.detach();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('sign-in-link'))
            controller.go(Routes.login);
    }
}



