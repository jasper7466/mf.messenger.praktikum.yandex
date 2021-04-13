import EventBus from "./EventBus";
import { set } from "../utilities/objectHandlers";

export default class Store {

    static _instance: Store;
    public eventBus: EventBus;
    private readonly _store: Record<string, unknown>;

    constructor() {
        if (Store._instance)
            return Store._instance;
        Store._instance = this;
        this.eventBus = new EventBus();
        this._store = {};
    }

    set(path: string, data: any) {
        const pathType = typeof path;
        if (pathType !== 'string')
            throw new Error(`${this.constructor.name}.set(path, data): Type of path is ${pathType} instead of string`);
        set(this._store, path, data);
        this.eventBus.emit(path);
    }

    get(path: string) {
        const pathType = typeof path;
        if (pathType !== 'string')
            throw new Error(`${this.constructor.name}.get(path): Type of path is ${pathType} instead of string`);

        const pathArr = path.split('.');
        let result: any = this._store;
        for (const key of pathArr) {
            const value = result[key];
            if (!value)
                return undefined;
            result = value;
        }
        return result;
    }
}