import Controller from '../../modules/Controller';
import authAPI from '../../api/AuthAPI';

class LoginController extends Controller {
    constructor() {
        super();
    }

    async signIn (data: any) {
        const response = await authAPI.signin(data);
        this.statusHandler(response.status);
    }

}

const loginController = new LoginController();
export default loginController;