import Controller from "@modules/Controller";
import {UserPasswordData, usersAPI} from "@api/UsersAPI";
import {storeMap} from "../../config";
import {PlainObject} from "../../types";

class ProfilePasswordController extends Controller {
    constructor() {
        super();
    }

    setDefaultProps(data: PlainObject) {
        this.storeSet(storeMap.profilePageProps, data)
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
