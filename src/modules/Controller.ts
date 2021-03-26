import Router from "./Router";
import { Routes } from "../index";
import Store from "./Store";
import { storeMap, httpErrorCodes } from "../config";
import { ErrorStatus } from "../components/errorBanner/types";

const router = new Router();
const store = new Store();
const errorProps = storeMap.errorPageProps;

export default class Controller {
    constructor() {}

    go(path: string) {
        router.go(path);
    }

    public statusHandler(status: number, description: string | null = null) {
        if (!description && httpErrorCodes.hasOwnProperty(status))
            { // @ts-ignore
                description = httpErrorCodes[status];
            }
        else
            description = httpErrorCodes.default;
        const props: ErrorStatus = {
            type: status,
            // @ts-ignore
            description: description
        }
        store.set(errorProps, props);
        this.go(Routes.error);
    }
}