import Controller from "../../modules/Controller";
import {UserPasswordData, usersAPI} from "../../api/UsersAPI";

class ProfilePasswordController extends Controller {
    constructor() {
        super();
    }

    async changeProfilePassword(data: UserPasswordData) {
        try {
            await usersAPI.changePassword(data);
            this.back();
        } catch (e) {
            this.statusHandler(e.status);
        }
    }
}

const profilePasswordController = new ProfilePasswordController();
export default profilePasswordController;