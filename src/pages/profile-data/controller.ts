import Controller from "@modules/Controller";
import {UserProfileData, usersAPI} from "@api/UsersAPI";

class ProfileDataController extends Controller {
    constructor() {
        super();
    }

    async changeProfileInfo(data: UserProfileData) {
        try {
            await usersAPI.changeProfile(data);
            this.back();
        } catch (e) {
            this.statusHandler(e.status);
        }
    }

    async changeProfileAvatar(data: FormData) {
        try {
            await usersAPI.changeAvatar(data);
            alert('Аватар обновлён');
        } catch (e) {
            this.statusHandler(e.status);
        }
    }
}

const profileDataController = new ProfileDataController();
export default profileDataController;