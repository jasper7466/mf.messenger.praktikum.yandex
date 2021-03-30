import Controller from "../../modules/Controller";
import {UserPasswordData, usersAPI} from "../../api/UsersAPI";

class ProfilePasswordController extends Controller {
    constructor() {
        super();
    }

    async changeProfilePassword(data: UserPasswordData) {
        const response = await usersAPI.changePassword(data);
        if (!this.statusHandler(response.status))
            this.back();
    }
}

const profilePasswordController = new ProfilePasswordController();
export default profilePasswordController;