import { template } from "./index.tmpl";
import Button from "@components/button/index";
import FormValidator from "@modules/FormValidator";
import Component from "@modules/Component";
import controller from "./controller";
import {Routes} from "@/index";
import {loginValidationRules as checks} from "@/config";

const validator = new FormValidator(checks);
validator.setDataHandler(controller.signIn.bind(controller));

export class LoginPage extends Component {

    constructor(props: any) {
        const button = new Button({caption: 'Авторизоваться', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        super(props);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    beforeCompile() {
        validator.detach();
    }

    afterCompile() {
        if (this.element)
            validator.attach(this.element, '.form')
    }

    afterMount() {
        controller.checkAuth();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('register-link'))
            controller.go(Routes.signup);
        if (target.classList.contains('demo-link'))
            controller.go(Routes.demo);
    }
}
