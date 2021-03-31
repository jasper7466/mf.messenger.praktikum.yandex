import Controller from "../../modules/Controller";
import {chatsAPI, CreateChatData, QueryOptions} from "../../api/ChatsAPI";
import {SETTINGS, storeMap} from "../../config";

class ChatsController extends Controller {
    constructor() {
        super();
    }

    async getChats(data?: QueryOptions) {
        const response = await chatsAPI.get(data);
        if (!this.statusHandler(response.status))
            return response.response;
        return null;
    }

    async createChat(data: CreateChatData) {
        const response = await chatsAPI.create(data);
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
}

const chatsController = new ChatsController();
export default chatsController;