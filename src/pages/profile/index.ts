import { template } from './index.tmpl';
import Component from "../../modules/Component";
import {storeMap} from "../../config";
import controller from "./controller";

export class ProfilePage extends Component {
    constructor(props: any) {
        super(props, storeMap.profilePageProps);
    }

    componentDidMount() {
        controller.updateUserInfo();
    }

    compile(context: any) {
        return Handlebars.compile(template)(context);
    }
}