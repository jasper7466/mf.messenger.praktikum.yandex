import Controller from "@modules/Controller";
import {chatsAPI, CreateChatData, QueryOptions} from "@api/ChatsAPI";
import {usersAPI, UserSearchData} from "@api/UsersAPI";
import {authAPI} from "@api/AuthAPI";
import {SETTINGS, storeMap} from "@/config";
import {PlainObject} from "../../types";
import WebSocketTransport from "../../modules/WebSocketTransport";

class ChatsController extends Controller {

    protected _socket: WebSocketTransport;

    constructor() {
        super();
        this._socket = new WebSocketTransport(SETTINGS.wssURL);
        this._socket.subscribe(WebSocketTransport.EVENTS.RECEIVED, this._socketMessageHandler.bind(this));
    }

    public async updateChatList(data?: QueryOptions) {
        const chats = await this._getChats(data);
        if (!chats) {
            return;
        }

        this.storeSet(storeMap.chatPageProps, null);

        for (const chat of chats) {
            if (chat.avatar === null) {
                chat.avatar = SETTINGS.avatarDummy;
            }

            chat.last = 'last message';
            chat.time = 'time';

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

        this.storeSet(storeMap.activeChatID, chatID);
        this._socket.open(`/chats/${userID}/${chatID}/${chatToken}`);
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
     * Обработчик websocket-событий типа "message"
     * @param event - объект MessageEvent
     * @private
     */
    private _socketMessageHandler(event: MessageEvent) {
        const messageData = JSON.parse(event.data);
        const userID = this.storeGet(storeMap.currentUserID);

        if (messageData.type === 'user connected')
            return;

        const message = {
            text: messageData.content,
            attachmentType: false,
            attachmentSource: false,
            datetime: messageData.time,
            time: messageData.time,
            isOwner: messageData.user_id === userID,
            isRead: true
        };

        const props = this.storeGet(storeMap.chatPageProps) as PlainObject;

        if (!props.feed)
            props.feed = [];
        if (Array.isArray(props.feed))
            props.feed.push(message);

        this.storeRewrite(storeMap.chatPageProps, props);
    }
}

const chatsController = new ChatsController();
export default chatsController;
