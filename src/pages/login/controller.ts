import Controller from "../../modules/Controller";
import authAPI from "../../api/AuthAPI";
import {Routes} from "../../index";

class LoginController extends Controller {
    constructor() {
        super();
    }

    async signIn (data: any) {
        const response = await authAPI.signin(data);
        const status = response.status;
        if (status >= 400)
            this.statusHandler(response.status);
        else
            this.go(Routes.chatSelect);
    }

}

const loginController = new LoginController();
export default loginController;