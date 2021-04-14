import Component from "@modules/Component";

export default class Route {

    private _path: string;
    private readonly _constructor: typeof Component;
    private readonly _props: any;
    private _block: any = null;

    constructor(path: string, constructor: typeof Component, props: any) {
        this._path = path;
        this._constructor = constructor;
        this._block = null;
        this._props = props;
    }

    navigate(path: string): void {
        if (this.match(path)) {
            this._path = path;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.unmount();
        }
    }

    match(path: string): boolean {
        return path === this._path;
    }

    render(): void {
        if (!this._block)
            this._block = new this._constructor(this._props);
        this.mount();
    }

    mount(): void {
        const root = document.querySelector(this._props.rootQuery);
        if (!root)
            throw new Error(`${this.constructor.name}: selector "${this._props.rootQuery}" not found`);
        this._block.mount(root);
    }
}