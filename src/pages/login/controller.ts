import Controller from "../../modules/Controller";
import {authAPI, LoginFormData} from "../../api/AuthAPI";
import {Routes} from "../../index";

class LoginController extends Controller {
    constructor() {
        super();
    }

    async signIn (data: LoginFormData) {
        const response = await authAPI.signIn(data);
        if (!this.statusHandler(response.status))
            this.go(Routes.chatSelect);
    }

    async checkAuth() {
        const response = await authAPI.getUserInfo();
        if (response.status === 200)
            this.go(Routes.chatSelect);
    }
}

const loginController = new LoginController();
export default loginController;