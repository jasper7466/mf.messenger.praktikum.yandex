import Controller from "@modules/Controller";
import {chatsAPI, CreateChatData, QueryOptions} from "@api/ChatsAPI";
import {usersAPI, UserSearchData} from "@api/UsersAPI";
import {authAPI} from "@api/AuthAPI";
import {SETTINGS, storeMap} from "@/config";
import {PlainObject} from "../../types";
import WebSocketTransport from "../../modules/WebSocketTransport";
import splitTimestamp from "../../utilities/splitTimestamp";

class ChatsController extends Controller {

    protected _socket: WebSocketTransport;

    constructor() {
        super();
        this._socket = new WebSocketTransport(SETTINGS.wssURL);
        this._socket.subscribe(WebSocketTransport.EVENTS.RECEIVED, this._socketMessageHandler.bind(this));
        this._socket.subscribe(WebSocketTransport.EVENTS.OPENED, this._socketOpenedHandler.bind(this));
    }

    public async updateChatList(data?: QueryOptions) {
        const chats = await this._getChats(data);

        if (!chats) {
            return;
        }

        this.storeSet(storeMap.chatList, null);

        for (const chat of chats) {

            if (chat.avatar === null) {
                chat.avatar = SETTINGS.avatarDummy;
            }

            const lastMessage = JSON.parse(chat.last_message);

            if (lastMessage.content.length > 25) {
                chat.last = lastMessage.content.slice(0, 25) + '...';
            } else {
                chat.last = lastMessage.content;
            }

            chat.time = splitTimestamp(lastMessage.time).hhmm

            const unread = await this._getUnread(chat.id);

            if (unread) {
                chat.unreads = unread.unread_count;
            } else {
                chat.unreads = 0;
            }
        }

        this.storeRewrite(storeMap.chatPageProps, {chats: chats});
    }

    public async createChat(data: CreateChatData) {
        try {
            const response = await chatsAPI.createChat(data);
            return response.response;
        } catch (e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    public async addUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID) as number;
        try {
            const response = await chatsAPI.addUser({users: [userId], chatId: chatId});
            return response.response;
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    public async removeUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID);
        try {
            await chatsAPI.deleteUser({users: [userId], chatId: chatId});
        } catch (e) {
            this.statusHandler(e.status);
            alert(`Пользователь ${data.login} удалён из чата`);
        }
    }

    public async pageMountHandler() {
        try {
            const response = await authAPI.getUserInfo();
            this.storeSet(storeMap.currentUserID, response.response['id']);
        } catch (e) {
            return;
        }
        await this.updateChatList();
    }

    /**
     * Обработчик размонтирования страницы
     */
    public pageUnmountHandler() {
        this._socket.close();
        this.storeRewrite(storeMap.chatPageProps, null);
    }

    /**
     * Обработчик выбора чата
     * @param chatID - идентификатор выбранного чата
     */
    public async chatSelectHandler(chatID: number) {
        const chatToken = await this._getChatToken(chatID);
        const userID = this.storeGet(storeMap.currentUserID);

        this.storeRewrite(storeMap.activeChatFeed, []);
        this.storeSet(storeMap.activeChatID, chatID);
        await this._socket.open(`/chats/${userID}/${chatID}/${chatToken}`);
    }

    /**
     * Отправляет сообщение через websocket
     * @param text - сообщение
     */
    public sendMessage(text: string) {
        const message = JSON.stringify({
            type: 'message',
            content: text,
        });

        this._socket.send(message);
    }

    private _requestOldMessages(offset = 0) {
        this._socket.send(JSON.stringify({
            content: offset,
            type: 'get old',
        }))
    }

    private async _getUnread(chatID: number) {
        try {
            const response = await chatsAPI.getNewMessagesCount(chatID);
            return response.response;
        } catch (e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    private async _getUserIdByLogin(data: UserSearchData) {
        try {
            const userData = await usersAPI.searchByLogin(data);
            const user = userData.response.filter((user: {[key: string]: any}) => user.login === data.login);
            if (!user.length) {
                alert(`Пользователь ${data.login} не найден`);
                return null;
            }
            return user[0].id;
        } catch (e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    private async _getChats(data?: QueryOptions) {
        try {
            const response = await chatsAPI.getChat(data);
            return response.response;
        } catch(e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    /**
     * Возвращает токен чата с указанным идентификатором
     * @param chatID - идентификатор чата
     * @private
     */
    private async _getChatToken(chatID: number) {
        try {
            const response = await chatsAPI.getToken(chatID);
            return response.response['token'];
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    /**
     * Обработчик websocket-событий типа "open"
     * @private
     */
    private _socketOpenedHandler() {
        this._requestOldMessages();
    }

    private _parseMessage(message: any, userID: number) {
        const time = splitTimestamp(message.time).hhmm;

        return  {
            text: message.content,
            attachmentType: false,
            attachmentSource: false,
            datetime: message.time,
            time: time,
            isOwner: message.user_id === userID,
            isRead: true
        };
    }

    /**
     * Обработчик websocket-событий типа "message"
     * @param event - объект MessageEvent
     * @private
     */
    private _socketMessageHandler(event: MessageEvent) {
        const userID = this.storeGet(storeMap.currentUserID);
        let messagesData = JSON.parse(event.data);

        if (messagesData.type === 'user connected') {
            return;
        }

        const props = this.storeGet(storeMap.chatPageProps) as PlainObject;

        if (!Array.isArray(messagesData)) {
            messagesData = [messagesData];
        }

        messagesData.reduce((messageList: unknown[], message: PlainObject) => {
            const parsedMessage = this._parseMessage(message, userID as number);
            messageList.push(parsedMessage);
            return messageList
        }, props.feed)

        this.storeRewrite(storeMap.chatPageProps, props);
    }
}

const chatsController = new ChatsController();
export default chatsController;
