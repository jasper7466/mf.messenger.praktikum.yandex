import transport from "./API";

export type QueryOptions = {
    offset?: number,
    limit?: number,
    title?: string
}

export interface CreateChatData {
    title: string;
}

class ChatsAPI {

    constructor() {}

    get(data?: QueryOptions) {
        return transport.get('/chats', {data: data});
    }

    getArchived(data: any) {
        return transport.get('/chats/archive', {data: data});
    }

    create(data: CreateChatData) {
        return transport.post('/chats', {data: data});
    }

    delete(data: any) {
        return transport.delete('/chats', {data: data});
    }

    archive(data: any) {
        return transport.post('/chats/archive', {data: data});
    }

    unArchive(data: any) {
        return transport.post('/chats/unarchive', {data: data});
    }

    getUsers(chatID: any) {
        return transport.get(`/chats/${chatID}/users`);
    }

    getNewMessagesCount(chatID: number) {
        return transport.get(`/chats/new/${chatID}`);
    }

    uploadAvatar(data: any) {
        return transport.put('/chats/avatar', {data: data});
    }

    addUser(data: any) {
        return transport.post('/chats/users', {data: data});
    }

    deleteUser(data: any) {
        return transport.delete('/chats/users', {data: data});
    }

    getToken(chatID: number) {
        return transport.post(`/chats/token/${chatID}`);
    }
}

export const chatsAPI = new ChatsAPI();