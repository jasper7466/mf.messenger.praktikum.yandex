import Controller from "@modules/Controller";
import {UserProfileData, usersAPI} from "@api/UsersAPI";
import profileController from "../profile/controller";

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
            const userInfo = await usersAPI.changeAvatar(data);
            await profileController.updateUserInfo(userInfo.response);
        } catch (e) {
            this.statusHandler(e.status);
        }
    }
}

const profileDataController = new ProfileDataController();
export default profileDataController;
