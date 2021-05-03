import Route from "./Route";
import Component from "./Component";

/**
 * Класс, реализующий роутер.
 */
export default class Router {

    static _instance: Router | null = null;

    private _rootSelector: string | null = null;
    private _routes: Route[] = [];
    private _history = window.history;
    private _currentRoute: Route | null = null;
    private _defaultRoutePathname: string | null = null;
    public _badRouteHandler?: () => void;

    /**
     * Создаёт singleton-экземпляр роутера
     * @param rootSelector - селектор класса корневого элемента
     */
    constructor(rootSelector: string | null = null) {
        // Реализована возможность создания экземпляра без инициализации
        if (Router._instance) {
            if (rootSelector && !Router._instance._rootSelector)
                Router._instance._rootSelector = rootSelector;
            return Router._instance;
        }
        this._rootSelector = rootSelector;
        Router._instance = this;
    }

    /**
     * Вспомогательный метод для проверки состояния инициализации корневого селектора
     */
    _rootCheck() {
        if (!this._rootSelector)
            throw new Error(`${this.constructor.name}: Instance exist, but root node selector not defined yet`);
    }

    /**
     * Вспомогательный метод для проверки наличия дубликата роута
     * @param pathname - путь
     */
    _checkRouteDuplicate(pathname: string) {
        const pathExist = this.getRoute(pathname);
        if (pathExist)
            throw new Error(`${this.constructor.name}: Route on path "${pathname}" already exists`);
    }

    /**
     * Вспомогательный метод для получения роута с проверкой на существование
     * @param pathname - путь
     */
    _getExistingRoute(pathname: string): Route | never {
        const route = this.getRoute(pathname);
        if (!route)
            throw new Error(`${this.constructor.name}: Route on path "${pathname}" doesn't exist`);
        return route;
    }

    /**
     * Регистрация нового роута
     * @param pathname - путь
     * @param block - конструктор блока
     * @param context - контекст блока
     */
    use(pathname: string, block: typeof Component, context: any): Router | never {
        this._rootCheck();
        this._checkRouteDuplicate(pathname);
        const route = new Route(pathname, block, {rootQuery: this._rootSelector, ...context});
        this._routes.push(route);
        return this;
    }

    /**
     * Установка роута по умолчанию
     * @param pathname - путь
     */
    setDefaultRoute(pathname: string): Router | never {
        this._getExistingRoute(pathname);
        this._defaultRoutePathname = pathname;
        return this;
    }

    /**
     * Установка обработчика перехода по несуществующему роуту
     * @param handler - функция-обработчик
     */
    setBadRouteHandler(handler: () => void): Router {
        this._badRouteHandler = handler;
        return this;
    }

    /**
     * Запуск роутера
     */
    start(): void {
        window.onpopstate = (event: any) => this._onRoute(event.currentTarget.location.pathname);
        this._onRoute(window.location.pathname);
    }

    /**
     * Обработчик изменения состояния
     * @param pathname - путь
     */
    _onRoute(pathname: string): void {
        // Переадресация на базовый роут в случае обращения к корню приложения
        if(this._defaultRoutePathname && pathname.match(/^\/?$/)) {
            this.go(this._defaultRoutePathname);
            return;
        }

        const route = this.getRoute(pathname);

        // Обработка несуществующего роута
        if (!route) {
            if (this._badRouteHandler)
                this._badRouteHandler();
            else if (this._defaultRoutePathname)
                this.go(this._defaultRoutePathname)
            return;
        }

        if (this._currentRoute)
            this._currentRoute.leave();

        this._currentRoute = route;
        route.render();
    }

    /**
     * Переход на указанный роут по его пути
     * @param path - путь
     */
    go(path: string) {
        this._history.pushState({}, "", path);
        this._onRoute(path);
    }

    /**
     * Переход по истории на одну запись назад
     */
    back() {
        this._history.back();
    }

    /**
     * Переход по истории на одну запись вперёд
     */
    forward() {
        this._history.forward();
    }

    /**
     * Получение сущности "Route" по заданному пути
     * @param path - путь
     */
    getRoute(path: string): Route | undefined {
        return this._routes.find(route => route.match(path));
    }
}
