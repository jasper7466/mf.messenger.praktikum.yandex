import {template} from "./index.tmpl";
import Component from "../../modules/Component";
import {chatNameValidationRules, storeMap} from "../../config";
import controller from "./controller";
import {Routes} from "../../index";
import Button from "../../components/button/index";
import FormValidator from "../../modules/FormValidator";

const validator = new FormValidator(chatNameValidationRules);
validator.setDataHandler(controller.createChat.bind(controller));

export class ChatSelectPage extends Component {
    constructor(props: any) {
        const addChatButton = new Button({caption: 'Создать чат', type: 'submit', classList: ['add-chat-button']});
        const submitNewChatButton = new Button({caption: 'Создать', type: 'submit'})

        if (addChatButton.element)
            Handlebars.registerPartial('addChatButton', addChatButton.element.innerHTML);
        if (submitNewChatButton.element)
            Handlebars.registerPartial('submitNewChatButton', submitNewChatButton.element.innerHTML);
        super(props, storeMap.chatsList);
        this.element.addEventListener('click', e => this.clickHandler(e));

    }

    componentDidUpdate() {
        validator.detach();
    }

    componentDidMount() {
        controller.updateChats();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    compiled() {
        if (this.element)
            validator.attach(this.element, '.new-chat-form')
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        const chatListItem = target.closest('.chat-list__item');
        if (chatListItem)
            this.chatSelectHandler(chatListItem as HTMLElement);
        else if (target.closest('.go-profile-link'))
            controller.go(Routes.profile);
        else if (target.closest('.add-chat-button'))
            this.newChatModalShow();
        else if (target.classList.contains('modal'))
            target.classList.remove('modal_active')
    }

    // Обработчик событий выбора чата
    chatSelectHandler(chatListItem: HTMLElement) {
        // Если чат уже активен - выходим
        if (chatListItem.classList.contains('chat-list__item_active'))
            return;

        // const chatID = chatListItem.dataset.id;
        const chatList = chatListItem.closest('.chat-list__list');
        let activeChat = null;

        if (chatList) {
            activeChat = chatList.querySelector('.chat-list__item_active');
            if (activeChat)
                activeChat.classList.remove('chat-list__item_active');
        }
        chatListItem.classList.add('chat-list__item_active');
    }

    newChatModalShow() {
        const modal = this.element.querySelector('.modal');
        if (modal)
            modal.classList.add('modal_active');
    }
}