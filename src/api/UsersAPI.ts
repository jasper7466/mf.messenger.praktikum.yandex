import transport from "./API";

export interface UserProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface UserPasswordData {
    oldPassword: string,
    newPassword: string
}

export interface UserSearchData {
    login: string
}

class UsersAPI {
    constructor() {}

    changeProfile(data: UserProfileData) {
        return transport.put('/user/profile',{data: data});
    }

    changeAvatar(data: FormData) {
        return transport.put('/user/profile/avatar',{data: data, headers: {'content-type': 'multipart/form-data'}});
    }

    changePassword(data: UserPasswordData) {
        return transport.put('/user/password', {data: data});
    }

    getByID(id: number) {
        return transport.get(`/user/${id}`);
    }

    searchByLogin(data: UserSearchData) {
        return transport.post('/user/search', {data: data});
    }
}

export const usersAPI = new UsersAPI();