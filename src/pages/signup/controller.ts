import Controller from "../../modules/Controller";
import {authAPI, RegisterFormData} from "../../api/AuthAPI";
import {Routes} from "../../index";

class SignUpController extends Controller {
    constructor() {
        super();
    }

    async signUp (data: RegisterFormData) {
        const response = await authAPI.signUp(data);
        if (!this.statusHandler(response.status, errorDescriptions))
            this.go(Routes.chatSelect)
    }
}

const errorDescriptions = {409: 'Пользователь с такими параметрами (login, email) уже существует'};

const signUpController = new SignUpController();
export default signUpController;