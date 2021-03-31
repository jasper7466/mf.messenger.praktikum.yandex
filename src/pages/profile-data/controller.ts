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

    async changeProfileAvatar(data: FormData) {
        const response = await usersAPI.changeAvatar(data);
        if (!this.statusHandler(response.status))
            alert('Аватар обновлён');
    }
}

const profileDataController = new ProfileDataController();
export default profileDataController;