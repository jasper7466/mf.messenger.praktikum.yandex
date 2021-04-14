import Controller from "@modules/Controller";
import {chatsAPI, CreateChatData, QueryOptions} from "@api/ChatsAPI";
import {usersAPI, UserSearchData} from "@api/UsersAPI";
import {SETTINGS, storeMap} from "@/config";

class ChatsController extends Controller {

    protected _socket: WebSocket | null = null;

    constructor() {
        super();
    }

    async getChats(data?: QueryOptions) {
        try {
            const response = await chatsAPI.getChat(data);
            return response.response;
        } catch(e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    async createChat(data: CreateChatData) {
        try {
            const response = await chatsAPI.createChat(data);
            return response.response;
        } catch (e) {
            this.statusHandler(e.status);
        }
        return null;
    }

    async getUnreads(chatID: number) {
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

    async updateChats(data?: QueryOptions) {
        const chats = await this.getChats(data);
        if (!chats) {
            return;
        }
        for (const chat of chats) {
            if (chat.avatar === null) {
                chat.avatar = SETTINGS.avatarDummy;
            }
            chat.last = 'last message';
            chat.time = 'time';
            const unreads = await this.getUnreads(chat.id);
            if (unreads) {
                chat.unreads = unreads.unread_count;
            } else {
                chat.unreads = 0;
            }
        }
        this.storeSet(storeMap.chatsList, {chats: chats});
    }

    async addUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID);
        try {
            const response = await chatsAPI.addUser({users: [userId], chatId: chatId});
            return response.response;
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    async removeUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID);
        try {
            await chatsAPI.deleteUser({users: [userId], chatId: chatId});
        } catch (e) {
            this.statusHandler(e.status);
            alert(`Пользователь ${data.login} удалён из чата`);
        }
    }

    async getChatToken(chatID: number) {
        try {
            const response = await chatsAPI.getToken(chatID);
            console.log(response.response['token']);
            return response.response['token'];
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    socketOpen(chatID: number) {
        if (this._socket)
            this.socketClose();
        const userID = this.storeGet(storeMap.currentUserID);
        const token = this.storeGet(storeMap.activeChatToken);
        this._socket = new WebSocket(`${SETTINGS.wssURL}/chats/${userID}/${chatID}/${token}`);
        this._socket.addEventListener('message', this.messageHandler.bind(this));
        console.log('socket opened:', userID, chatID, token);
    }

    socketClose() {
        this._socket?.removeEventListener('message', this.messageHandler.bind(this));
        this._socket?.close();
    }

    socketSendText(msg: string) {
        this._socket?.send(JSON.stringify({
            content: msg,
            type: 'message'
        }));
        console.log('Message sended:', msg);
    }

    messageHandler(event: any) {
        console.log(`ReceivedMessage:`, event.data);
        //this.storeSet(storeMap.activeChatFeed, event.data)
    }
}

const chatsController = new ChatsController();
export default chatsController;