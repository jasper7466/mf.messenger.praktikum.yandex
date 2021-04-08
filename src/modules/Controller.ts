import Router from "@modules/Router";
import { Routes } from "@/index";
import Store from "@modules/Store";
import { storeMap, httpErrorCodes } from "@/config";
import { ErrorStatus } from "@components/errorBanner/types";

const router = new Router();
const store = new Store();
const errorProps = storeMap.errorPageProps;

type ErrorsDescription = { [key: string]: string } | null;

export default class Controller {
    constructor() {}

    go(path: string) {
        router.go(path);
    }

    back() {
        router.back();
    }

    storeSet(path: string, data: any) {
        store.set(path, data)
    }

    storeGet(path: string) {
        return store.get(path);
    }

    public statusHandler(status: number, descriptions: ErrorsDescription = null): boolean {
        // Обрабатываются только коды ошибок
        if (status < 400)
            return false;

        let description = '';

        if (descriptions && descriptions.hasOwnProperty(status))        // Ищем в специфичном наборе описаний
            description = descriptions[status];
        else if (httpErrorCodes.hasOwnProperty(status))                 // Ищем в базовом наборе описаний
            description = httpErrorCodes[status];
        else                                                            // Присваиваем описание по умолчанию
            description = httpErrorCodes.default;

        const props: ErrorStatus = { type: status, description: description };
        store.set(errorProps, props);
        this.go(Routes.error);
        return true;
    }
}