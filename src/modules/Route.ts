//@ts-nocheck
export class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block)
            this._block.hide();
    }

    match(pathname) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            this.mount();
            return;
        }
        this._block.show();
    }

    mount() {
        const root = document.querySelector(this._props.rootQuery);
        if (!root)
            throw new Error(`${this.constructor.name}: selector "${this._props.rootQuery}" not found`);
        if (this._block.element)
            root.appendChild(this._block.element);
    }
}