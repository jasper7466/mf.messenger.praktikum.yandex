import EventBus from "./EventBus";
import set from "../utilities/set";
import { PlainObject } from "../types";
import cloneDeep from "../utilities/cloneDeep";

interface IStore {
    set(path: string, data: PlainObject): void | never;
    get(path: string): unknown | never;
    rewrite(path: string, data: PlainObject): void | never;
    delete(path: string): void | never;
    subscribe(path: string, callback: () => void): void;
    unsubscribe(path: string, callback: () => void): void;

    forceEmit(path: string): void;
}

type Host = {
    host: PlainObject,
    key: string
}

export default class Store implements IStore {

    static _instance: Store;
    public eventBus: EventBus;
    private _store: Record<string, unknown>;

    /**
     * Создаёт singleton-экземпляр класса
     */
    constructor() {
        if (Store._instance)
            return Store._instance;
        Store._instance = this;
        this.eventBus = new EventBus();
        this._store = {};
    }

    /**
     * Очищает объект-хранилище.
     * Подписки на события сохраняются
     */
    public flush() {
        this._store = {};
    }

    /**
     * Записывает данные в хранилище путём глубокого слияния.
     * Существующие ключи устанавливаются в значения из data.
     * Если путь не существует - он будет создан
     * @param path - путь
     * @param data - данные
     */
    public set(path: string, data: any) {
        this._raiseErrorIfPathNotString(path);

        set(this._store, path, cloneDeep(data));
        this._emit(path);
    }

    /**
     * Возвращает глубокую копию данных по указанному пути.
     * Если путь не существует - будет выброшено исключение
     * @param path - путь
     */
    public get(path: string): unknown {
        this._raiseErrorIfPathNotString(path);

        const data = this._getByPathOrRaiseError(path);

        return cloneDeep(data);
    }

    /**
     * Перезаписывает значение по указанному пути.
     * Если путь не существует - он будет создан
     * @param path - путь
     * @param data - данные
     */
    public rewrite(path: string, data: any) {
        this._raiseErrorIfPathNotString(path);

        const target = this._getHost(path);

        set(this._store, path,null);
        target.host[target.key] = cloneDeep(data);
        this._emit(path);
    }

    /**
     * Удаляет ключ по указанному пути.
     * Если путь не существует - будет выброшено исключение
     * @param path - путь
     */
    public delete(path: string) {
        this._raiseErrorIfPathNotString(path);

        const target = this._getHost(path);

        this._raiseErrorIfHasNoProperty(target.host, target.key, path);

        delete target.host[target.key];
    }

    /**
     * Подписывает переданный обработчик на события изменений по указанному пути.
     * Проверка существования пути не выполняется
     * @param path - путь
     * @param callback - обработчик
     */
    public subscribe(path: string, callback: () => void) {
        this.eventBus.subscribe(path, callback);
    }

    /**
     * Отписывает переданный обработчик от событий изменений по указанному пути.
     * Проверка существования пути не выполняется
     * @param path - путь
     * @param callback - обработчик
     */
    public unsubscribe(path: string, callback: () => void) {
        this.eventBus.unsubscribe(path, callback);
    }

    /**
     * Возвращает значение по указанному пути.
     * Если путь не существует - выбрасывается исключение
     * @param path - путь
     * @protected
     */
    protected _getByPathOrRaiseError(path: string) {
        const pathKeys = path.split('.');

        return pathKeys.reduce((target, key) => {
            this._raiseErrorIfHasNoProperty(target, key, path);
            return target[key];
        }, this._store);
    }

    /**
     * Возвращает объект, содержащий ссылку на предпоследний объект по указанному пути и
     * последний ключ пути.
     * Если предпоследний адрес пути не существует - выбрасывается исключение
     * @param path - путь
     * @protected
     */
    protected _getHost(path: string): Host | never {
        const pathKeys = path.split('.');

        if (pathKeys.length === 0)
            throw new Error(`${this.constructor.name}: Root operations is prohibited`);

        const targetKey = pathKeys.pop() as string;
        const reducedPath = pathKeys.join('.');

        const targetObject = this._getByPathOrRaiseError(reducedPath) as PlainObject;

        return {
            host: targetObject,
            key: targetKey
        }
    }

    /**
     * Инициирует события на шине по всей цепочке указанного пути.
     * Проверка существования пути не выполняется
     * @param path - путь
     * @protected
     */
    protected _emit(path: string) {
        const pathKeys = path.split('.');
        pathKeys.reduce((partial, current) => {
            partial = [partial, current].filter(Boolean).join('.');

            this.eventBus.emit(partial);

            return partial;
        }, '');
    }

    /**
     * Выбрасывает исключение, если аргумент - не строка
     * @param path - путь
     * @protected
     */
    protected _raiseErrorIfPathNotString(path: unknown) {
        if (typeof path !== 'string')
            throw new Error(`${this.constructor.name}: Type of "path" must be string`);
    }

    /**
     * Выбрасывает исключение, если у объекта отсутствует указанный ключ
     * @param target - целевой объект
     * @param key - ключ
     * @param fullPath - полный путь (для вывода в тексте ошибки)
     * @protected
     */
    protected _raiseErrorIfHasNoProperty(target: PlainObject, key: string, fullPath: string) {
        if (!target.hasOwnProperty(key)) {
            throw new Error(`${this.constructor.name}: Key "${key}" of path "${fullPath}" doesn't exist in store`);
        }
    }

    forceEmit(path: string) {
        this.eventBus.emit(path);
    }
}
