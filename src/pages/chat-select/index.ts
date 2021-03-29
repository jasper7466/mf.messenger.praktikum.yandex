import {template} from "./index.tmpl";
import Component from "../../modules/Component";
import {storeMap} from "../../config";
import controller from "./controller";

export class ChatSelectPage extends Component {
    constructor(props: any) {
        super(props, storeMap.chatsList);
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    componentDidMount() {
        controller.updateChats();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }

    clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        const chatListItem = target.closest('.chat-list__item');
        if (chatListItem)
            this.chatSelectHandler(chatListItem as HTMLElement);
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
}