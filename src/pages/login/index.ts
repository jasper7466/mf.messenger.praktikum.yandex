import { template } from "./index.tmpl";
import Button from "../../components/button/index";
import FormValidator from "../../modules/FormValidator";
import Component from "../../modules/Component";
import controller from "./controller";

const checks = {
    login: [
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    password: [FormValidator.CHECKS.REQUIRED]
}

const validator = new FormValidator(checks);
validator.setDataHandler(controller.signIn.bind(controller));

export class LoginPage extends Component {

    constructor(props: any) {
        const button = new Button({ link: './chat-select.html', caption: 'Авторизоваться', type: 'submit'});
        if (button.element)
            Handlebars.registerPartial('button', button.element.innerHTML);
        super(props);
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
}