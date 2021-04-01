import Controller from "../../modules/Controller";
import {chatsAPI, CreateChatData, QueryOptions} from "../../api/ChatsAPI";
import {usersAPI, UserSearchData} from "../../api/UsersAPI";
import {SETTINGS, storeMap} from "../../config";

class ChatsController extends Controller {
    constructor() {
        super();
    }

    async getChats(data?: QueryOptions) {
        const response = await chatsAPI.getChat(data);
        if (!this.statusHandler(response.status))
            return response.response;
        return null;
    }

    async createChat(data: CreateChatData) {
        const response = await chatsAPI.createChat(data);
        if (!this.statusHandler(response.status))
            return response.response;
        return null;
    }

    async getUnreads(chatID: number) {
        const response = await chatsAPI.getNewMessagesCount(chatID);
        if (!this.statusHandler(response.status))
            return response.response;
        return null;
    }

    private async _getUserIdByLogin(data: UserSearchData) {
        const userData = await usersAPI.searchByLogin(data);
        if (this.statusHandler(userData.status))
            return null;
        const user = userData.response.filter((user: {[key: string]: any}) => user.login === data.login);
        if (!user.length) {
            alert(`Пользователь ${data.login} не найден`);
            return null;
        }
        return user[0].id;
    }

    async updateChats(data?: QueryOptions) {
        const chats = await this.getChats(data);
        if (!chats)
            return;
        for (const chat of chats) {
            if (chat.avatar === null)
                chat.avatar = SETTINGS.avatarDummy;
            chat.last = 'last message';
            chat.time = 'time'
            const unreads = await this.getUnreads(chat.id);
            chat.unreads = unreads.unread_count;
        }
        this.storeSet(storeMap.chatsList, {chats: chats});
    }

    async addUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID);
        const response = await chatsAPI.addUser({users: [userId], chatId: chatId});
        if (!this.statusHandler(response.status))
            return response.response;
    }

    async removeUser(data: UserSearchData) {
        const userId = await this._getUserIdByLogin(data);
        const chatId = this.storeGet(storeMap.activeChatID);
        const response = await chatsAPI.deleteUser({users: [userId], chatId: chatId});
        if (!this.statusHandler(response.status))
            alert(`Пользователь ${data.login} удалён из чата`);
    }
}

const chatsController = new ChatsController();
export default chatsController;