import EventBus from './EventBus';
import Store from './Store';
import { merge } from '../utilities/objectHandlers';
import {storeMap} from "../config";

type Element = null | HTMLElement;
type Property = Record<string, any>;

interface Meta {
    tagName: string;
    props: Property;
    storePath: string | null;
}

const store = new Store();

export class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private readonly _meta: Meta;
    private _element: Element = null;

    public eventBus: EventBus;
    public props: object;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(props = {}, storePath: string | null = null, tagName = 'div') {
        const eventBus = new EventBus();
        this._meta = { tagName, props, storePath };//, storePath };
        this.props = this._makePropsProxy(props);
        this.eventBus = eventBus;
        this._registerEvents(eventBus);
        if (storePath)
            store.eventBus.subscribe(storePath, () => eventBus.emit(Component.EVENTS.FLOW_RENDER));
        eventBus.emit(Component.EVENTS.INIT);
    }

    setParent(parent: Component) {
        if (this._meta.storePath)
            store.eventBus.subscribe(this._meta.storePath, () => parent.eventBus.emit(Component.EVENTS.FLOW_RENDER))
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.subscribe(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.subscribe(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.subscribe(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.subscribe(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        this._element = this._createDocumentElement(this._meta.tagName);
        // TODO: Установка наследования всех стилей родителя, чтобы не ломалась вёрстка
        this._element.setAttribute('style', 'all: inherit');
    }

    init() {
        this._createResources();
        this.eventBus.emit(Component.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    componentDidMount(/*oldProps?: object*/) {}

    _componentDidUpdate(oldProps?: object, newProps?: object) {
        const response = this.componentDidUpdate(oldProps, newProps);
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        return response;
    }

    componentDidUpdate(oldProps?: object, newProps?: object) {
        if (oldProps || newProps) {}
        return true;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        if (this._meta.storePath)
            merge(this._meta.props, store.get(storeMap.errorPageProps));
        const block = this.render(this._meta.props);
        if (this._element) {
                this._element.innerHTML = block;
        }
    }

    render(context: any) {
        return context;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: object) {
        const self = this;
        return new Proxy(props, {
            set(target: any, prop: any, val) {
                target[prop] = val;
                self.eventBus.emit(Component.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty() {
                throw new Error("нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        if (this.element)
            this.element.style.display = "block";
    }

    hide() {
        if (this.element)
            this.element.style.display = "none";
    }
}