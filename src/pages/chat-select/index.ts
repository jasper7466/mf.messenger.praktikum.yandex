import {template} from "./index.tmpl";
import Component from "@modules/Component";
import {chatNameValidationRules, loginValidationRules, storeMap} from "@/config";
import controller from "./controller";
import {Routes} from "@/index";
import Button from "@components/button/index";
import FormValidator from "@/modules/FormValidator";
import xssEscape from "../../utilities/xssEscape";

const newChatValidator = new FormValidator(chatNameValidationRules);
const addUserValidator = new FormValidator(loginValidationRules);
const removeUserValidator = new FormValidator(loginValidationRules);

newChatValidator.setDataHandler(controller.createChat.bind(controller));
addUserValidator.setDataHandler(controller.addUser.bind(controller));
removeUserValidator.setDataHandler(controller.removeUser.bind(controller));

export class ChatSelectPage extends Component {
    constructor(props: any) {
        const addChatButton = new Button({caption: 'Создать чат', type: 'submit', classList: ['add-chat-button']});
        const submitNewChatButton = new Button({caption: 'Создать', type: 'submit'});
        const addUserButton = new Button({caption: 'Добавить', type: 'submit'});
        const removeUserButton = new Button({caption: 'Удалить', type: 'submit'});

        if (addChatButton.element)
            Handlebars.registerPartial('addChatButton', addChatButton.element.innerHTML);
        if (submitNewChatButton.element)
            Handlebars.registerPartial('submitNewChatButton', submitNewChatButton.element.innerHTML);
        if (addUserButton.element)
            Handlebars.registerPartial('addUserButton', addUserButton.element.innerHTML);
        if (removeUserButton.element)
            Handlebars.registerPartial('removeUserButton', removeUserButton.element.innerHTML);
        super(props, storeMap.chatPageProps);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    beforeCompile() {
        newChatValidator.detach();
        removeUserValidator.detach();
        removeUserValidator.detach();
    }

    async beforeMount() {
        await controller.pageMountHandler();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    afterCompile() {
        if (this.element) {
            newChatValidator.attach(this.element, '.new-chat-form');
            addUserValidator.attach(this.element, '.add-user-form');
            removeUserValidator.attach(this.element, '.remove-user-form');
        }
    }

    afterUnmount() {
        controller.pageUnmountHandler();
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        const chatListItem = target.closest('.chat-list__item');

        if (chatListItem) {
            this.chatSelectHandler(chatListItem as HTMLElement);
            return;
        }

        if (target.closest('.go-profile-link')) {
            controller.go(Routes.profile);
            return;
        }

        if (target.closest('.add-chat-button')) {
            this._showModal('.new-chat-modal');
            return;
        }

        if (target.classList.contains('modal')) {
            this._hideCurrentModal(target);
            return;
        }

        if (target.classList.contains('chat-options-button')) {
            this._showModal('.chat-menu-modal');
            return;
        }

        if (target.classList.contains('add-user-link')) {
            this._hideModal('.chat-menu-modal');
            this._showModal('.add-user-modal');
            return;
        }

        if (target.classList.contains('remove-user-link')) {
            this._hideModal('.chat-menu-modal');
            this._showModal('.remove-user-modal');
            return;
        }

        if (target.classList.contains('round-button_type_send')) {
            this._sendMessage();
            return;
        }
    }

    private async chatSelectHandler(chatListItem: HTMLElement) {
        // Если чат уже активен - выходим
        if (chatListItem.classList.contains('chat-list__item_active')) {
            return;
        }

        const chatID = chatListItem.dataset.id;
        if (!chatID) {
            throw new Error(`${this.constructor.name}: Chat-list item chatID not defined`);
        }

        await controller.chatSelectHandler(parseInt(chatID));

        this._deactivateChat();
        this._activateChat(chatListItem);
        this._hideFeedPlaceholder();
        this._showChatFeed();

        controller.storeSet(storeMap.chatPageProps + '.chatSelected', true);
    }

    private _showChatFeed() {
        const chat = this.element.querySelector('.chat');
        if (chat)
            chat.classList.remove('side-container_hidden');
    }

    private _hideFeedPlaceholder() {
        const chatPlaceholder = this.element.querySelector('.no-chat-selected');
        if (chatPlaceholder)
            chatPlaceholder.classList.add('side-container_hidden');
    }

    private _deactivateChat() {
        const chatList = this.element.querySelector('.chat-list__list');
        if (chatList) {
            const activeChat = chatList.querySelector('.chat-list__item_active');
            if (activeChat) {
                activeChat.classList.remove('chat-list__item_active');
            }
        }
    }

    private _sendMessage() {
        const messageInput = this.element.querySelector('.chat__sender-input') as HTMLInputElement;
        const message = messageInput?.value;

        if (!message || message === '') {
            return;
        }

        messageInput.value = '';
        controller.sendMessage(xssEscape(message));
    }

    private _activateChat(chatListItem: Element) {
        const chatName = chatListItem.querySelector('.chat-caption')?.textContent;
        const chatAvatar = (chatListItem.querySelector('.avatar__image') as HTMLImageElement).src;

        chatListItem.classList.add('chat-list__item_active');
        controller.storeSet(storeMap.activeChatName, chatName);
        controller.storeSet(storeMap.activeChatAvatar, chatAvatar);
    }

    private _hideCurrentModal(target: Element) {
        target.classList.remove('modal_active');
    }

    private _showModal(selector: string) {
        const modal = this.element.querySelector(selector);
        if (modal)
            modal.classList.add('modal_active');
    }

    private _hideModal(selector: string) {
        const modal = this.element.querySelector(selector);
        if (modal)
            modal.classList.remove('modal_active');
    }
}
