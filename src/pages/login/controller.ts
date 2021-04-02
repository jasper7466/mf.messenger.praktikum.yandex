import Controller from "../../modules/Controller";
import {authAPI, LoginFormData} from "../../api/AuthAPI";
import {Routes} from "../../index";

class LoginController extends Controller {
    constructor() {
        super();
    }

    async signIn (data: LoginFormData) {
        try {
            await authAPI.signIn(data);
            this.go(Routes.chatSelect);
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    async checkAuth() {
        try {
            await authAPI.getUserInfo();
        } catch (e) {
            return;
        }
        this.go(Routes.chatSelect);
    }
}

const loginController = new LoginController();
export default loginController;