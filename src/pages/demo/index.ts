import { template } from "./index.tmpl";
import Button from "@components/button/index";
import Component from "@modules/Component";
import controller from "./controller";
import {Routes} from "@/index";
import {demoUsers} from "../../config";

export class DemoPage extends Component {

    constructor(props: any) {
        const userButton1 = new Button({caption: 'Пользователь 1', type: 'button', classList: ['user1']});
        const userButton2 = new Button({caption: 'Пользователь 2', type: 'button', classList: ['user2']});

        if (userButton1.element)
            Handlebars.registerPartial('userButton1', userButton1.element.innerHTML);
        if (userButton2.element)
            Handlebars.registerPartial('userButton2', userButton2.element.innerHTML);

        super(props);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('back-link')) {
            controller.go(Routes.login);
        }
        else if (target.classList.contains('user1')) {
            controller.signIn(demoUsers.user1);
        }
        else if (target.classList.contains('user2')) {
            controller.signIn(demoUsers.user2);
        }
    }
}
