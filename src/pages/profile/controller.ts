import Controller from "../../modules/Controller";
import {authAPI, UserInfoData} from "../../api/AuthAPI";
import SETTINGS, {storeMap} from "../../config";


export class ProfileController extends Controller {
    constructor() {
        super();
    }

    async getUserInfo() {
        const response = await authAPI.getUserInfo();
        if (this.statusHandler(response.status))
            return null;
        return response.response;
    }

    async updateUserInfo() {
        const userInfo: UserInfoData = await this.getUserInfo();
        if (!userInfo)
            return;
        if (!userInfo.avatar)
            userInfo.avatar = SETTINGS.avatarDummy;
        this.storeSet(storeMap.profilePageProps, userInfo);
    }
}

const profileController = new ProfileController();
export default profileController;