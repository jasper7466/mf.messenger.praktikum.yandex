import transport from "./API";

export interface RegisterFormData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface LoginFormData {
    login: string,
    password: string
}

export interface UserInfoData {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

class AuthAPI {
    constructor() {
    }
    /** Create new user */
    signUp(data: RegisterFormData) {
        return transport.post('/auth/signup',{data: data});
    }

    /** Auth existing user */
    signIn(data: LoginFormData) {
        return transport.post('/auth/signin',{data: data});
    }

    getUserInfo() {
        return transport.get('/auth/user');
    }

    logout(data: any) {
        return transport.post('/auth/logout',{data: data});
    }
}

export const authAPI = new AuthAPI();