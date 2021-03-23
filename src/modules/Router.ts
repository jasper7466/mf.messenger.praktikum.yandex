//@ts-nocheck

import { Route } from './Route';

export default class Router {

    constructor(readonly _rootQuery?) {
        if (Router._instance)
            return Router._instance;
        if (!_rootQuery)
            throw new Error(`${this.constructor.name}: Instance does not exist, root node selector not defined`);
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        Router._instance = this;
    }

    use(pathname, block, context) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery, ...context});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = event => this._onRoute(event.currentTarget.location.pathname);
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route)
            return;
        if (this._currentRoute)
            this._currentRoute.leave();
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}