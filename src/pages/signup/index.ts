import { template } from './index.tmpl';
import Button from '../../components/button/index';
import FormValidator from "../../modules/FormValidator";
import Component from "../../modules/Component";
import controller from "./controller";
import {Routes} from "../../index";

const checks = {
    email: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.EMAIL
    ],
    login: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    first_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    second_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    phone: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PHONE,
    ],
    password: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ],
    verify_password: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ]
}

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



