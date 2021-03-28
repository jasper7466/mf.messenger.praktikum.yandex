import transport from "./API";

class AuthAPI {
    constructor() {
    }
    /** Create new user */
    signup(data: any) {
        return transport.post('/auth/signup',{data: data});
    }

    /** Auth existing user */
    signin(data: any) {
        return transport.post('/auth/signin',{data: data});
    }

    getUserInfo(data: any) {
        return transport.post('/auth/user',{data: data});
    }

    logout(data: any) {
        return transport.post('/auth/logout',{data: data});
    }
}

const authAPI = new AuthAPI();

export default authAPI;