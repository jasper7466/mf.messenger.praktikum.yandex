import Route from "./Route";
import Component from "./Component";

export default class Router {

    static _instance: Router | null = null;

    private _rootSelector: string | null = null;
    private _routes: Route[] = [];
    private _history = window.history;
    private _currentRoute: Route | null = null;

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

    _rootCheck() {
        if (!this._rootSelector)
            throw new Error(`${this.constructor.name}: Instance exist, but root node selector not defined yet`);
    }

    use(path: string, block: typeof Component, context: any) {
        this._rootCheck();
        const route = new Route(path, block, {rootQuery: this._rootSelector, ...context});
        this._routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: any) => this._onRoute(event.currentTarget.location.pathname);
        this._onRoute(window.location.pathname);
    }

    _onRoute(path: string): void {
        const route = this.getRoute(path);
        if (!route)
            return;
        if (this._currentRoute)
            this._currentRoute.leave();
        this._currentRoute = route;
        route.render();
    }

    go(path: string) {
        this._history.pushState({}, "", path);
        this._onRoute(path);
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    getRoute(path: string): Route | undefined {
        return this._routes.find(route => route.match(path));
    }
}