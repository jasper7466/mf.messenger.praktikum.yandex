import {template} from "./index.tmpl";
import Component from "@modules/Component";
import {chatNameValidationRules, loginValidationRules, storeMap} from "@/config";
import controller from "./controller";
import {Routes} from "@/index";
import Button from "@components/button/index";
import FormValidator from "@/modules/FormValidator";

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

    componentDidUpdate() {
        newChatValidator.detach();
        removeUserValidator.detach();
        removeUserValidator.detach();
    }

    componentDidMount() {
        controller.updateChats();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    compiled() {
        if (this.element) {
            newChatValidator.attach(this.element, '.new-chat-form');
            addUserValidator.attach(this.element, '.add-user-form');
            removeUserValidator.attach(this.element, '.remove-user-form');
        }
    }

    clickHandler(event: Event) {
        // event.stopPropagation();
        const target = event.target as HTMLElement;

        const chatListItem = target.closest('.chat-list__item');
        if (chatListItem)
            this.chatSelectHandler(chatListItem as HTMLElement);
        else if (target.closest('.go-profile-link'))
            controller.go(Routes.profile);
        else if (target.closest('.add-chat-button'))
            this.newChatModalShow();
        else if (target.classList.contains('modal'))
            target.classList.remove('modal_active');
        else if (target.classList.contains('chat-options-button')) {
            const chatMenu = this.element.querySelector('.chat-menu-modal');
            if (chatMenu)
                chatMenu.classList.add('modal_active');
        }
        else if (target.classList.contains('add-user-link')) {
            const chatMenu = this.element.querySelector('.chat-menu-modal');
            if (chatMenu)
                chatMenu.classList.remove('modal_active');
            const addUserModal = this.element.querySelector('.add-user-modal');
            if (addUserModal)
                addUserModal.classList.add('modal_active');
        }
        else if (target.classList.contains('remove-user-link')) {
            const chatMenu = this.element.querySelector('.chat-menu-modal');
            if (chatMenu)
                chatMenu.classList.remove('modal_active');
            const addUserModal = this.element.querySelector('.remove-user-modal');
            if (addUserModal)
                addUserModal.classList.add('modal_active');
        }
        else if (target.classList.contains('round-button_type_send')) {
            const messageInput = this.element.querySelector('.chat__sender-input') as HTMLInputElement;
            const msg = messageInput?.value;
            if (!msg || msg === '')
                return;
            messageInput.value = '';
            controller.socketSendText(msg);
        }
    }

    // Обработчик событий выбора чата
    async chatSelectHandler(chatListItem: HTMLElement) {
        // Если чат уже активен - выходим
        if (chatListItem.classList.contains('chat-list__item_active'))
            return;

        const chatID = chatListItem.dataset.id;
        if (!chatID)
            return;
        controller.storeSet(storeMap.activeChatID, parseInt(chatID));

        const chatToken = await controller.getChatToken(parseInt(chatID));

        // TODO: 
        console.log(`Chat token received! Token: ${chatToken}`);

        controller.storeSet(storeMap.activeChatToken, chatToken);
        controller.socketOpen(parseInt(chatID));

        const chatList = chatListItem.closest('.chat-list__list');
        let activeChat = null;

        if (chatList) {
            activeChat = chatList.querySelector('.chat-list__item_active');
            if (activeChat)
                activeChat.classList.remove('chat-list__item_active');
        }
        chatListItem.classList.add('chat-list__item_active');
        const chatPlaceholder = this.element.querySelector('.no-chat-selected');
        if (chatPlaceholder)
            chatPlaceholder.classList.add('side-container_hidden');
        const chat = this.element.querySelector('.chat');
        if (chat)
            chat.classList.remove('side-container_hidden');
        const props = controller.storeGet(storeMap.chatPageProps);
        props.chatSelected = true;
    }

    newChatModalShow() {
        const modal = this.element.querySelector('.new-chat-modal');
        if (modal)
            modal.classList.add('modal_active');
    }
}