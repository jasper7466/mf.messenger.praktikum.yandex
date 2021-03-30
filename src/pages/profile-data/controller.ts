import Controller from "../../modules/Controller";
import {UserProfileData, usersAPI} from "../../api/UsersAPI";

class ProfileDataController extends Controller {
    constructor() {
        super();
    }

    async changeProfileInfo(data: UserProfileData) {
        const response = await usersAPI.changeProfile(data);
        if (!this.statusHandler(response.status))
            this.back();
    }
}

const profileDataController = new ProfileDataController();
export default profileDataController;