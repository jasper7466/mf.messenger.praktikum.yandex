import Controller from "../../modules/Controller";
import {authAPI, UserInfoData} from "../../api/AuthAPI";
import {SETTINGS, storeMap} from "../../config";
import {Routes} from "../../index";

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

    async logout() {
        const response = await authAPI.logout();
        if (this.statusHandler(response.status))
            return null;
        this.go(Routes.login);
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